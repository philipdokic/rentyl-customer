# ================================================
# RUBY->CONTROLLER->LISTINGS =====================
# ================================================
class Api::ListingsController < ApplicationController

  # ----------------------------------------------
  # CALLBACKS ------------------------------------
  # ----------------------------------------------
  #before_action :set_listing, only: [:show]

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    @brand = Brand.find(params[:brand])
    @listings = @brand.unit_listings.includes(:property)
    render json: @listings
  end

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
    # listing = ActiveRecord::Base.connection.execute("
    #   SELECT
    #     unit_listings.id,
    #     unit_listings.currency,
    #     unit_listings.is_multi_unit,
    #     unit_listings.is_room_type,
    #     units.id as unit_id,
    #     bedrooms.*
    #   FROM unit_listings
    #   INNER JOIN units
    #     ON unit_listings.unit_id = units.id
    #   INNER JOIN properties
    #     ON units.property_id = properties.id
    #   INNER JOIN bedrooms
    #     ON bedrooms.unit_id = bedrooms.id
    #   WHERE slug = 'belmont-chalet'
    # ").first


    test = UnitListing.where(slug: 'belmont-chalet').includes({ property: [:location] }, { unit: [:bathrooms, :bedrooms, :reviews] }).first
    render json: {
      id: test.id,
      currency: test.currency,
      multi_unit: test.is_multi_unit,
      room_type: test.is_room_type,
      unit: test.unit,
      property: test.unit.property,
      property_manager: test.unit.property.get_manager,
      location: test.unit.property.location,
      bedrooms: test.unit.bedrooms,
      bathrooms: test.unit.bathrooms,
      reviews: test.unit.reviews.with_status("published").order('reviewed_date DESC'),
      review_average: test.unit.reviews.with_status("published").average(:rating),
      google_maps_api_key: ENV['GOOGLE_MAPS_API_KEY']
    }


    # render json: {
    #   id: @listing.id,
    #   currency: @listing.currency,
    #   multi_unit: @listing.is_multi_unit,
    #   room_type: @listing.is_room_type,
    #   unit: @listing.unit,
    #   property: @listing.unit.property,
    #   property_manager: @listing.unit.property.get_manager,
    #   location: @listing.unit.property.location,
    #   bedrooms: @listing.unit.bedrooms,
    #   bathrooms: @listing.unit.bathrooms,
    #   reviews: @listing.unit.reviews.with_status("published").order('reviewed_date DESC'),
    #   review_average: @listing.unit.reviews.with_status("published").average(:rating),
    #   google_maps_api_key: ENV['GOOGLE_MAPS_API_KEY']
    # }
  end

  # ----------------------------------------------
  # AVAILABILITY ---------------------------------
  # ----------------------------------------------
  def availability
    render json: {
      availability: @listing.unit.unit_availability,
      availability_calendar: @listing.unit.unit_availability.cx_availability_calendar,
      booking_calendar: @listing.unit.unit_availability.booking_calendar,
      default_availability_changeover: @listing.unit.unit_availability.default_availability_changeover,
      average_default_nightly_price: @listing.unit_pricing.average_default_nightly_price
    }
  end

  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # SET-LISTING ----------------------------------
  # ----------------------------------------------
  def set_listing
    @listing = UnitListing.find_by(slug: params[:id])
  end

end
