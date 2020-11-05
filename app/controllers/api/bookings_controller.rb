class Api::BookingsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def checkout
    get_listing_by_id
    set_quote
    get_checkout_data_by_listing_id
    @stripe_publishable_key = ENV['STRIPE_PUBLISHABLE_KEY']
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
    @fees ||= @quote.fees.all_outside_base_rent_with_addons
    @property ||= @unit.property
    @availability ||= @unit.unit_availability
    @pricing ||= @unit.unit_pricing
    @fees.each do |f|
      if f['name'] == 'Travel Insurance Fee'
        f['value'] = @quote.csa_insurance_fee
      end
    end
  end

  def set_quote
    check_in = Date.parse(params['check_in'])
    check_out = Date.parse(params['check_out'])
    num_guests = params['num_guests'].to_i
    @quote ||= Quotes::Main.new(@listing.unit, check_in, check_out, num_guests)
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
