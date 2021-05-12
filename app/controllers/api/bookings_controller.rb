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
    set_stripe_publishable_key
    set_stripe_customer
    set_stripe_intent

    render json:{
      listing: @listing,
      obfuscated_address: @property.location.obfuscated_address,
      property: @property,
      featured_image: @property.property_images[0].property_image_urls,
      rental_agreement: @brand.rental_agreement,
      slug: @property.name.parameterize,
      stripe_publishable_key: @stripe_publishable_key,
      stripe_customer_id: @stripe_customer_id,
      stripe_intent_id: @stripe_intent_id,
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
  # GET-BOOKING-BY-CODE --------------------------
  # ----------------------------------------------
  def get_booking_by_code
    @booking ||= @brand.bookings.where(booking_code: params[:booking_code]).first
    @charges ||= @booking.charges
  end

  # ----------------------------------------------
  # LISTING-ID -----------------------------------
  # ----------------------------------------------
  def listing_id
    params[:listing_id]
  end

  # ----------------------------------------------
  # GET-LISTING-BY-ID ----------------------------
  # ----------------------------------------------
  def get_listing_by_id
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
      uri = URI("#{ENV['DIRECT_URL']}/api/v2/checkout/#{@listing.unit.id}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = (uri.scheme == "https")
      request = Net::HTTP::Get.new(uri.path, {'Content-Type' => 'application/json'})
      request.body = {check_in: Date.parse(params['check_in']), check_out: Date.parse(params['check_out']), num_guests: params['num_guests']}.to_json
      @quote ||= JSON.parse(http.request(request).body)

      puts "QUOTE"
      puts @quote

      return @quote
    end
  end

  # ----------------------------------------------
  # SET-STRIPE-PUBLISHABLE-KEY -------------------
  # ----------------------------------------------
  def set_stripe_publishable_key
    connected_trust_acct = @listing.unit&.portfolio&.stripe_connect_account&.connected? ? @listing.unit&.portfolio&.stripe_connect_account : nil
    stripe_account = connected_trust_acct || @listing.organization&.default_stripe_connect_account
    Stripe.api_key = stripe_account&.access_token || ENV['STRIPE_SECRET_KEY']
    Stripe.api_version = ENV['STRIPE_API_VERSION']
    @stripe_publishable_key = stripe_account&.stripe_publishable_key || ENV['STRIPE_PUBLISHABLE_KEY']
  end

  # ----------------------------------------------
  # SET-STRIPE-CUSTOMER --------------------------
  # ----------------------------------------------
  def set_stripe_customer
    if @booking&.stripe_customer_id.nil?
      customer = Stripe::Customer.create
      @stripe_customer_id = customer.id
    else
      @stripe_customer_id = @booking.stripe_customer_id
    end
  end

  # ----------------------------------------------
  # SET-STRIPE-INTENT ----------------------------
  # ----------------------------------------------
  def set_stripe_intent
    intent = Stripe::SetupIntent.create({
      customer: @stripe_customer_id,
      payment_method_types: [
        "card"
      ],
      usage: "off_session"
    })
    @stripe_intent_id = intent.client_secret
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
