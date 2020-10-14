# ================================================
# RUBY->CONTROLLER->LISTINGS =====================
# ================================================
class Api::ListingsController < ApplicationController

  # ----------------------------------------------
  # CALLBACKS ------------------------------------
  # ----------------------------------------------
  before_action :set_listing, only: [:show]

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    @brand = Brand.find(params[:brand])
    @listings = @brand.unit_listings
    render json: @listings
  end

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
    render json: {
      id: @listing.id,
      currency: @listing.currency,
      unit: @listing.unit,
      property: @listing.unit.property,
      property_manager: @listing.unit.property.get_manager,
      location: @listing.unit.property.location,
      bedrooms: @listing.unit.bedrooms,
      bathrooms: @listing.unit.bathrooms,
      reviews: @listing.unit.reviews.with_status("published").order('reviewed_date DESC'),
      review_average: @listing.unit.reviews.with_status("published").average(:rating),
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
    @listing = UnitListing.find(params[:id])
  end

end
