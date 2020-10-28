# ================================================
# RUBY->SERVICE->SEARCH ==========================
# ================================================
module Search

  # ==============================================
  # SEARCH->PROPERTIES ===========================
  # ==============================================
  class Properties < Main

    # --------------------------------------------
    # INITIALIZE ---------------------------------
    # --------------------------------------------
    def initialize(params, brand)
      super(params)
      @brand = brand
    end

    def call
      data = Set.new
      # TODO: copied this from original search controller for time constraints
      # need to refactor this at some point
      ordered_prop_ids = order(filtered_properties).pluck(:id).uniq
      paginated_prop_ids = ordered_prop_ids.slice((page - 1) * limit, limit)

      paginated_prop_ids&.each do |prop_id|
        prop = Property.find(prop_id)
        #prop = Property.where(id: prop_id).includes([:location, :units, { unit_listings: [:brand] }]).first
        search_datum = build_search_datum(prop)
        data.add(search_datum) if (search_datum[:listings].first['can_stay'] && search_datum['bookable'] == true) || !booking_range
      end

      # Ignore the re-order below for Sotheby's
      return data if @brand.organization_id == 52

      random_indices = data.length >= 4 ? [*3..(data.length - 1)] : [3] # if data.length is less than 4, random_indices evaluates to [], which causes this error: https://app.honeybadger.io/projects/52724/faults/61525462#notice-trace
      is_default_sort = @params[:sort] == 'default'

      # Order the property list by featured and instant_booking
      data.sort_by do |d|
        result = is_default_sort ? random_indices.sample : 3
        result = 0 if d['featured'] && d['instant_booking']
        result = 1 if d['featured'] && !d['instant_booking']
        result = !d['featured'] && d['instant_booking'] && is_default_sort ? random_indices.sample : 2
        result
      end
    end

    def get_quote(obj)
      # TODO: copied this from original search controller for time constraints
      # need to refactor this at some point
      unit = obj.is_a?(Property) ? obj.units.first : obj
      check_in = Date.parse(booking_range[0]["key"])
      check_out = Date.parse(booking_range[-1]["key"])
      Quotes::Main.new(unit, check_in, check_out, @params[:num_guests].to_i)
    end

    def build_search_datum(property)
      # TODO: copied this from original search controller for time constraints
      # need to refactor this at some point
      search_datum = {
        'average_default_nightly_price': nil,
        'bookable_nightly_price': nil,
        'currency': nil,
        'property': property,
        'location': property.location,
        # 'distance': property.location&.distance_to(center),
        'listings': Set.new,
        'bookable': false,
        'featured': false,
        'num_bathrooms': 0,
        'num_bedrooms': 0,
        'name': property.name,
        'multi_unit': property.multi_unit || units.length > 1,
        # 'room_type_property': property.room_types.present? && units.map(&:calendar).reject(&:nil?).count == units.count,
        'default_unit_id': property.units.first.id,
        # 'featured_image': property.featured_image,
        'search_type': 'dateless',
        'slug': property.name.parameterize
      }

      review_ratings_array = []
      is_bookable = false

      property.unit_listings.where(brand: @brand).includes(unit: [:reviews]).each do |listing|
        unit = listing.unit
        next unless unit.active?

        search_listing = {
          'listing': listing,
          'unit': unit,
          'pricing': unit.unit_pricing,
          'average_default_nightly_price': unit.unit_pricing&.average_default_nightly_price.to_f,
          'bookable_nightly_price': unit.unit_pricing&.average_default_nightly_price.to_f,
          'can_fit_guests': @params[:num_guests].to_i <= unit.num_sleep,
          'num_bathrooms': unit.num_bathrooms || 0,
          'num_bedrooms': unit.num_bedrooms || 0,
        }

        review_ratings_array += unit.reviews.with_status(:published).pluck(:rating)

        search_datum['featured'] = listing.featured
        search_datum['can_fit_guests'] = search_listing[:can_fit_guests]
        # search_datum[:featured_image] ||= unit.featured_image
        search_datum[:currency] ||= listing.currency

        if booking_range.present?
          # Only set if true, only one unit needs to be bookable
          # for the entire property to be considered bookable
          if unit.bookable?(@params)
            is_bookable = true
          end

          check_in = Date.parse(booking_range[0]["key"])
          check_out = Date.parse(booking_range[-1]["key"])
          availability = AvailabilityService.new(unit, check_in, check_out)

          search_datum['search_type'] = 'dated'
          search_listing['bookable'] = availability.bookable?
          search_listing['can_stay'] = availability.can_stay?
          search_listing['bookable_nightly_price_before_promotion'] = get_quote(unit).average_nightly_rate_with_agg_fees
          search_listing['bookable_nightly_price'] = get_quote(unit).average_nightly_promotional_rate_with_agg_fees
          search_listing['available'] = availability.available?
          search_listing['booked'] = availability.booked?
          search_listing['changeover'] = unit.changeover_calendar_rules(booking_range.dup)
          search_listing['instant_booking'] = availability.instant_bookable?
          search_datum['instant_booking'] = availability.instant_bookable?
        elsif search_listing[:can_fit_guests]
          search_datum['bookable'] = true
        end
        search_datum[:listings].add(search_listing)
      end

      search_datum['bookable'] = is_bookable
      search_datum['review_count'] = review_ratings_array.count
      search_datum['review_average'] = review_ratings_array.sum.to_f / review_ratings_array.size
      search_datum['num_bathrooms'] = search_datum[:listings].map { |l| l[:num_bathrooms].to_i }.max
      search_datum['num_bedrooms'] = search_datum[:listings].map { |l| l[:num_bedrooms].to_i }.max
      search_datum['average_default_nightly_price'] = search_datum[:listings].map { |l| l[:average_default_nightly_price].to_i }.min
      search_datum['bookable_nightly_price_before_promotion'] = search_datum[:listings].map { |l| l[:bookable_nightly_price_before_promotion].to_i }.min
      search_datum['bookable_nightly_price'] = search_datum[:listings].map { |l| l[:bookable_nightly_price].to_i }.min
      search_datum
    end

    def filtered_properties
      @filtered_properties ||= properties.where([
        bed_bath_guest_query,
        min_max_price_query,
        instant_booking_query,
        distance_bounds_query,
        no_bookings_query,
        no_unavailable_query,
        brand_query,
        amenities_query,
        min_max_stays_calendar_query
      ].flatten.compact.join(' AND '))
    end

    def properties_in_bounds
      @properties_in_bounds ||= properties.where(
        bounds_location_ids.present? &&
        "locations.id IN (#{bounds_location_ids.join(', ')})"
      ).order(sort_string)
    end

    def min_max_unit_prices
      # TODO: should eventually figure this out. Not using
      # range_max_min_prices because it is very slow, so just
      # using defaults for now

      # @min_max_unit_prices ||= if booking_range.blank?
      #                            default_max_min_prices
      #                          else
      #                            range_max_min_prices
      #                          end

      @min_max_unit_prices ||= default_max_min_prices
    end

    def min_max_stays_calendar_query
      return if booking_range.blank?
      range = booking_range.length - 1
      start_date = booking_range[0]['key']
      end_date = booking_range[-1]['key']
      "(
        (unit_availabilities.availability_calendar::json->'#{start_date}'->>'stayMin')::int <= #{range} AND (unit_availabilities.availability_calendar::json->'#{start_date}'->>'stayMax')::int >= #{range}
        OR unit_availabilities.default_stay_min <= #{range} AND unit_availabilities.default_stay_max >= #{range}
      )"
    end

    def default_max_min_prices

      if properties_in_bounds.count > 0
        @default_max_min_prices ||= ActiveRecord::Base.connection.execute("
          with data as (
          SELECT (((up.default_nightly_weekend * 2) + (up.default_nightly_weekday * 5)) / 7)::float as average_value
            FROM units u
            INNER JOIN properties p ON p.id = u.id
            INNER JOIN unit_listings ul ON ul.unit_id = u.id
            INNER JOIN unit_pricings up ON up.unit_id = u.id
            WHERE (
              p.id IN (#{properties_in_bounds.pluck(:id).compact.join(', ')})
              AND
              p.active = 't'
              AND
              u.active = 't'
              AND
              ul.brand_id = #{@brand.id}
            )
          )
          SELECT
            max(average_value) as max,
            min(average_value) as min
          FROM data
        ").first
      else
        { max:9999999, min:0 }
      end
    end

    def range_max_min_prices
      # FIXME: figure out how to do this quickly. Not currently being used because very slow
      # TODO: copied this from original search controller for time constraints
      # need to refactor this at some point
      prices = properties_in_bounds.collect { |p| get_quote(p).average_nightly_rate_with_agg_fees }

      { max: prices.max, min: prices.min }.as_json
    end

    def max_bedrooms
      max_bedrooms = units.flatten.map(&:num_bedrooms).reject(&:nil?).max
    end
    def max_baths
      max_baths = units.flatten.map(&:num_bathrooms).reject(&:nil?).max
    end
    def max_guests
      max_guests = units.flatten.map(&:num_sleep).reject(&:nil?).max
    end

    def bed_bath_guest_query
      "
        units.num_bedrooms >= #{@params[:num_bedrooms].to_i}
        AND
        units.num_bathrooms >= #{@params[:num_bathrooms].to_f}
        AND
        units.num_sleep >= #{@params[:num_guests].to_i}
      "
    end

    def min_max_price_query
      low_query = @params[:price_low] && ">= #{@params[:price_low].to_i}"
      high_query = @params[:price_high] && "<= #{@params[:price_high].to_i}"
      [low_query, high_query].compact.map { |q| price_query(q) }
    end

    def instant_booking_query
      return if @params[:instant_book].to_s != 'true' || booking_range.blank?

      booking_range.map do |date|
        day_name = Date.parse(date['key']).strftime('%A')
        "(
          unit_availabilities.availability_calendar
          LIKE
          '%#{date['key']}\":\{\"availability\":\"available%'
          OR
          unit_availabilities.default_availability_changeover
          LIKE
          '%day\":\"#{day_name}\",\"availability\":\"available%'
        )"
      end.join(' AND ')
    end

    def distance_bounds_query
      location_ids = [
        distance_location_ids,
        bounds_location_ids
      ].flatten.compact.uniq

      return if location_ids.blank?

      "locations.id IN (#{location_ids.uniq.compact.join(', ')})"
    end

    def no_bookings_query
      return if booking_range.blank?

      a = Date.parse(booking_range[0]['key']) ## start
      b = Date.parse(booking_range[-1]['key']) ## end
      ## bookings that start before or on start and end after or on end
      booking_conflicts_one = Booking.where("check_in <= ? AND check_out >= ? AND archived = 'f' AND cancelled = 'f'", a, b)
      ## bookings that start after start and start before end and end after end
      booking_conflicts_two = Booking.where("check_in >= ? AND check_in < ? AND check_out > ? AND archived = 'f' AND cancelled = 'f'", a, b, a)
      ## bookings that start after start and end after start and end before end
      booking_conflicts_three = Booking.where("check_in > ? AND check_out > ? AND check_out < ? AND archived = 'f' AND cancelled = 'f'", a, a, b)
      ## bookings that start before start and ends after start and ends before end
      bookings_conflicts_four = Booking.where("check_in < ? AND check_out > ? AND check_out < ? AND archived = 'f' AND cancelled = 'f'", a, a, b)

      booking_conflicts = booking_conflicts_one + booking_conflicts_two + booking_conflicts_three + bookings_conflicts_four

      bad_listing_ids = booking_conflicts.pluck(:unit_listing_id).compact

      return if bad_listing_ids.blank?
      "(NOT (unit_listings.id IN (#{bad_listing_ids.join(', ')})))"
    end

    def no_unavailable_query
      return if booking_range.blank?

      booking_range.map do |date|
        day_name = Date.parse(date['key']).strftime('%A')
        "(
          (
            unit_availabilities.availability_calendar LIKE '%#{date['key']}%'
            AND
            NOT (unit_availabilities.availability_calendar LIKE '%#{date['key']}\":\{\"availability\":\"unavailable%')
          )
          OR
          (
            NOT (unit_availabilities.availability_calendar LIKE '%#{date['key']}%')
            AND
            NOT (unit_availabilities.default_availability_changeover LIKE '%\"day\":\"#{day_name}\",\"availability\":\"unavailable%')
          )
        )"
      end.join(' AND ')
    end

    def brand_query
      "unit_listings.brand_id = #{@brand.id}"
    end

    def amenities_query
      return if @params[:amenities].blank?
      @amenities = JSON.parse(@params[:amenities])
      return if @amenities.blank?
      [amenities_string('Property'), amenities_string('Unit')].compact.join(' AND ')
    end

    def amenities_string(klass_string = 'Property')
      return if @amenities[klass_string].blank?
      formatted_klass_string = klass_string.downcase.pluralize
      @amenities[klass_string].map { |amenity| "#{formatted_klass_string}.#{amenity['column']} LIKE '%\"#{amenity['property']}\":{\"label\":\"#{amenity['label']}\",\"value\":true%'" }.join(' AND ')
    end

    def distance_location_ids
      return @distance_location_ids if @distance_location_ids
      return if @params[:distance].to_i <= 0 || center.blank?

      @distance_location_ids = locations.within(
        @params[:distance].to_i,
        origin: center
      ).pluck(:id).compact
    end

    def bounds_location_ids
      @bounds_location_ids ||= if bounds.present?
                                  locations.in_bounds(bounds).pluck(:id).compact
                                end
    end

    # sort_string is overwritting a method in Main
    def sort_string
      query = @params[:sort].to_s.split('_')
      type = query[0]
      dir = query[1] || 'ASC'

      if type == 'price'
        price_query(dir)
      elsif type == 'name'
        "units.name #{dir}"
      else
        'unit_listings.featured desc, unit_listings.instant_booking desc'
      end
    end

    def properties
      @properties ||= Property.where(id: Unit.where(active: true).pluck(:property_id), active: true).joins(
        :location,
        units: [
          :unit_availability,
          :unit_pricing,
          :unit_listings
        ]
      )
    end

    def units
      filtered_properties.map(&:units)
    end

    def locations
      @locations ||= Location.where(
        locationable_id: properties.pluck(:id),
        locationable_type: 'Property'
      )
    end

    def price_query(additional = '')
      "(
        (
          (unit_pricings.default_nightly_weekday * 5)
          +
          (unit_pricings.default_nightly_weekend * 2)
        )
        / 7
      ) #{additional}"
    end



    def booking_range
      return nil if @params[:booking_range].blank?
      JSON.parse(@params[:booking_range])
    end

    def center
      @center ||= if bounds.blank?
                    loc = properties_in_bounds.first&.location
                    [loc&.geo_latitude, loc&.geo_longitude].compact
                  else
                    [bounds.center.lat, bounds.center.lng]
                  end
    end

    def bounds(radius = 20)
      @bounds ||= if @params[:geo_ne_lat].present? &&
                      @params[:geo_ne_lon].present? &&
                      @params[:geo_sw_lat].present? &&
                      @params[:geo_sw_lon].present?
                    ne = Geokit::LatLng.new(@params[:geo_ne_lat], @params[:geo_ne_lon])
                    sw = Geokit::LatLng.new(@params[:geo_sw_lat], @params[:geo_sw_lon])
                    Geokit::Bounds.new(sw, ne)
                  elsif @params[:loc].present?
                    Geokit::Bounds.from_point_and_radius(@params[:loc], radius)
                  end
    end
  end
end
