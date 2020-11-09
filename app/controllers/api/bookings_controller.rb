class Api::BookingsController < ApplicationController

  skip_before_action :verify_authenticity_token

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
      brand_currency: @listing.brand.currency
    }
  end

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

  private

  def listing_id
    params[:listing_id]
  end

  def get_brand
    @brand ||= get_brand_by_domain
  end

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

  def get_listing_by_id
    get_brand
    @listing ||= @brand.unit_listings.find(listing_id)
  end

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

  def set_quote
    uri = URI("http://www.lvh.me:3000/api/v2/checkout/#{@listing.unit.id}")
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.path, {'Content-Type' => 'application/json'})
    request.body = {check_in: Date.parse(params['check_in']), check_out: Date.parse(params['check_out']), num_guests: params['num_guests'].to_i}.to_json
    @quote ||= JSON.parse(http.request(request).body)
  end

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
