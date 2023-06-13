# ================================================
# RUBY->CONTROLLER->LISTINGS =====================
# ================================================
class Api::ListingsController < ApplicationController

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    @listings = @brand.unit_listings.includes(:property)
    render json: @listings
  end

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
    if params[:room]
      unit_ids = Unit.where(room_type_id:params[:room]).pluck(:id)
      @listing = @brand.unit_listings.where(slug: params[:id], is_room_type: true, unit_id: unit_ids).includes({ property: [:location, :property_images] }, { unit: [:bathrooms, :bedrooms, :reviews, :unit_availability, :unit_images, :unit_pricing] }).first
    else
      @listing = @brand.unit_listings.where(slug: params[:id], is_room_type: false).includes({ property: [:location, :property_images] }, { unit: [:bathrooms, :bedrooms, :reviews, :unit_availability, :unit_images, :unit_pricing] }).first
    end
     
    # Property Images
    property_images = @listing.property.property_images
    property_images_url = []
    property_images.each do |p|
      p_obj = {}
      p_obj[:url] = p.property_image_urls
      p_obj[:label] = p.label
      property_images_url.push(p_obj)
    end
    @property_images = property_images_url

    # Unit Images
    # TODO: Can we remove?
    unit_images = @listing.unit.unit_images
    unit_images_url = []
    unit_images.each do |u|
      u_obj = {}
      u_obj[:url] = u.unit_image_urls
      u_obj[:label] = u.label
      unit_images_url.push(u_obj)
    end
    @unit_images = unit_images_url
    
    render json: {
      id: @listing.id,
      slug: params[:id],
      currency: @listing.currency,
      multi_unit: @listing.is_multi_unit,
      room_type: @listing.is_room_type,
      room_type_id: @listing.unit&.room_type&.id,
      room_type_name: @listing.unit&.room_type&.name,
      unit: @listing.unit,
      property: @listing.property,
      units: @listing.property.is_multi_unit? ? build_unit_listings_for_details_multi : [],
      property_manager: @listing.property.get_manager,
      property_images: @property_images,
      location: @listing.property.location,
      bedrooms: @listing.unit.bedrooms,
      bathrooms: @listing.unit.bathrooms,
      unit_images: @unit_images,
      reviews: @listing.unit.reviews.with_status("published").order('reviewed_date DESC'),
      review_average: @listing.unit.reviews.with_status("published").average(:rating),
      availability: @listing.unit.unit_availability,
      availability_calendar: @listing.unit.unit_availability.cx_availability_calendar,
      booking_calendar: @listing.unit.unit_availability.booking_calendar,
      default_availability_changeover: @listing.unit.unit_availability.default_availability_changeover,
      average_default_nightly_price: @listing.unit_pricing.average_default_nightly_price,
      refund_policy: @listing.refund_policy,
      refund_policy_custom: @listing.refund_policy_custom
    }
  end

  # ----------------------------------------------
  # FETCH-COUPON-CODES ---------------------------
  # ----------------------------------------------
  def fetch_coupon_codes
    unit_id = UnitListing.find(params[:listing_id]).unit.id
    promotion_ids = UnitPromo.where(unit_id: unit_id).map(&:promotion_id)
    coupon_codes = Promotion.where(id: promotion_ids).map(&:coupon_code).reject(&:nil?).map(&:downcase)

    render json: coupon_codes.as_json
  end

  private

  def build_unit_listings_for_details_multi
    @units = @listing.property.units
    @units_infos = []
    @reviews = []
    @review_average = 0
    reviews_average_array = []
    @brand.unit_listings.includes(unit: [:reviews]).where(unit: @units).find_each do |l|
      u = l.unit
      u_obj = {}
      unit_images = u.unit_images
      unit_images_url = []
      unit_images.each do |ul|
        ul_obj = {}
        ul_obj[:url] = ul.unit_image_urls
        ul_obj[:label] = ul.label
        unit_images_url.push(ul_obj)
      end
      unit_images_urls = unit_images_url
      u_obj['images'] = unit_images_urls
      u_obj['listing'] = l
      u_obj['average_default_nightly_price'] = u.unit_pricing.average_default_nightly_price
      u_obj['unit'] = u
      u_obj['unit_avaiilability'] = u.unit_availability
      u_obj['availability_calendar'] = u.unit_availability.cx_availability_calendar
      u_obj['booking_calendar'] = u.unit_availability.booking_calendar
      u_obj['default_availability_changeover'] = u.unit_availability.default_availability_changeover
      u_obj['bedrooms'] = u.bedrooms
      u_obj['bathrooms'] = u.bathrooms
      reviews = u.reviews.with_status("published").order(reviewed_date: :asc)

      if reviews.any?
        @reviews += reviews
        reviews_average_array.push(reviews.average(:rating))
      end

      @units_infos.push(u_obj)
    end

    if @reviews.any?
      @review_average = reviews_average_array.inject(&:+).to_f / reviews_average_array.size
    end
    return @units_infos
  end
end
