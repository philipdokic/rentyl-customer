# ================================================
# RUBY->CONTROLLER->BOOKINGS =====================
# ================================================
class Api::BookingsController < ApplicationController

  # ----------------------------------------------
  # CALLBACKS ------------------------------------
  # ----------------------------------------------
  skip_before_action :verify_authenticity_token

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # CHECKOUT -------------------------------------
  # ----------------------------------------------
  def checkout
    get_listing_by_id
    set_quote
    get_checkout_data_by_listing_id

    render json:{
      listing: @listing,
      obfuscated_address: @property.location.obfuscated_address,
      property: @property,
      featured_image: @property.property_images[0],
      rental_agreement: @brand.rental_agreement,
      slug: @property.name.parameterize,
      stripe_publishable_key: ENV['STRIPE_PUBLISHABLE_KEY'],
      unit: @unit,
      deposits: @deposits,
      fees: @fees,
      checkout_total: @quote['total'],
      verify_signature: @brand.verify_signature,
      verify_image: @brand.verify_image,
      verify_image_description: @brand.verify_image_description,
      brand_currency: @listing.brand.currency,
      quote_id: @quote['id']
    }
  end

  # ----------------------------------------------
  # RECEIPT --------------------------------------
  # ----------------------------------------------
  def receipt
    get_booking_by_code
    @customer = @booking.customer
    @listing = @booking.unit_listing
    @unit = @listing.unit
    @property = @listing.unit_property
    @location = @property.location
    @verified = params[:verified]
    @securityDeposit = @booking.security_deposit
    @securityDepositRequired = @booking.has_security_deposit? && !Charge.exists?(booking: @booking, status: "auth")
    @stripePublishableKey = ENV['STRIPE_PUBLISHABLE_KEY']
    @standard_contract_url = @booking.standard_contract&.url
    get_property_manager_from_property_and_brand
  end

  # ----------------------------------------------
  # PAYMENT --------------------------------------
  # ----------------------------------------------
  def payment
    get_booking_by_code
    @customer = @booking.customer
    @listing = @booking.unit_listing
    @unit = @listing.unit
    @property = @listing.unit_property
    @location = @property.location
    @verified = params[:verified]
    @bookingPaid = @booking.is_paid_in_full
    @securityDeposit = @booking.security_deposit
    @securityDepositRequired = @booking.has_security_deposit? && !Charge.exists?(booking: @booking, status: "auth")
    @stripePublishableKey= ENV['STRIPE_PUBLISHABLE_KEY']
    get_property_manager_from_property_and_brand

    @booking_deposits = @booking.unit_listing.deposits.where(is_security_deposit: 'false')
    if !@booking_deposits.blank?
      remaining_balance_due_date = Booking.generate_remaining_balance_due_date(@booking_deposits, @booking)
      #remaining_balance_due_date == 'manual'
      #Date.parse(remaining_balance_due_date.to_s)
        #Date.today
      puts "XXXXX -> Booking Code: #{@booking.booking_code}/ Due Date: #{remaining_balance_due_date} / Amount Due #{@booking.price_remaining.to_i}"
    end
  end

  # ----------------------------------------------
  # CHECKOUT-AVAILABILITY ------------------------
  # ----------------------------------------------
  def checkout_availability
    @unit = get_listing_by_id.unit
    booking_range = JSON.parse(params[:booking_range])
    check_in = Date.parse(booking_range[0]['key'])
    check_out = Date.parse(booking_range[-1]['key'])
    availability = AvailabilityService.new(@unit, check_in, check_out)

    render json: {
      'bookable': availability.bookable?,
      'booked': availability.booked?,
      'can_fit_guests': @unit.can_fit_guests(params[:guests].to_i),
      'can_stay': availability.can_stay?,
      'available': availability.available?,
      'instant_booking': availability.instant_bookable?,
      'changeover': @unit.changeover_calendar_rules(booking_range)
    }
  end

  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # LISTING-ID -----------------------------------
  # ----------------------------------------------
  def listing_id
    params[:listing_id]
  end

  # ----------------------------------------------
  # GET-BRAND ------------------------------------
  # ----------------------------------------------
  def get_brand
    @brand ||= get_brand_by_domain
  end

  # ----------------------------------------------
  # GET-BRAND-BY-DOMAIN --------------------------
  # ----------------------------------------------
  def get_brand_by_domain
    domain ||= Domain.where(url: request.host).first
    if !domain.nil?
      if domain.live?
        domain.brand
      else
        logger.debug "Domain found but not live: #{domain.url}"
        'disabled'
      end
    else
      logger.debug "No domain found: #{request.host}"
      nil
    end
  end

  # ----------------------------------------------
  # GET-LISTING-BY-ID ----------------------------
  # ----------------------------------------------
  def get_listing_by_id
    get_brand
    @listing ||= @brand.unit_listings.find(listing_id)
  end

  # ----------------------------------------------
  # GET-CHECKOUT-DATA-BY_LISTING-ID --------------
  # ----------------------------------------------
  def get_checkout_data_by_listing_id
    @unit ||= @listing.unit
    @deposits ||= @listing.deposits
    @fees ||= @quote['fees']
    @property ||= @unit.property
    @availability ||= @unit.unit_availability
    @pricing ||= @unit.unit_pricing
    @fees.each do |f|
      if f['name'] == 'Travel Insurance Fee'
        f['value'] = @quote['csa_insurance_fee']
      end
    end
  end

  # ----------------------------------------------
  # SET-QUOTE ------------------------------------
  # ----------------------------------------------
  def set_quote
    @quote = Quote.find(params[:quote_id]) if params[:quote_id]
    unless @quote
      uri = URI("https://staging.getdirect.io/api/v2/checkout/#{@listing.unit.id}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = (uri.scheme == "https")
      request = Net::HTTP::Get.new(uri.path, {'Content-Type' => 'application/json'})
      request.body = {check_in: Date.parse(params['check_in']), check_out: Date.parse(params['check_out']), num_guests: params['num_guests'].to_i}.to_json
      @quote ||= JSON.parse(http.request(request).body)
    end
  end

  # ----------------------------------------------
  # SET-PRICING ----------------------------------
  # ----------------------------------------------
  def set_pricing
    get_listing_by_id unless @listing
    @pricing ||= @listing&.unit_pricing
    @pricing_calendar = @pricing&.pricing_calendar
  end

  # ----------------------------------------------
  # GET-PROPERTY-MANAGER-FROM-PROPERTY-AND-BRAND -
  # ----------------------------------------------
  def get_property_manager_from_property_and_brand
    if @property.try(:manager_info_visible)
      if @property.employees.where(role: ['organization_owner','brand_owner','property_manager','property_contact']).length > 0
        @property_manager = @property.employees.where(role: ['organization_owner','brand_owner','property_manager','property_contact']).first
      elsif @brand.employees.where(role: ['organization_owner','brand_owner']).length > 0
        @property_manager = @brand.employees.where(role: ['organization_owner','brand_owner']).first
      else
        @property_manager = @brand.organization.user
      end
    else
      @property_manager = false
    end
  end

end
