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
    @brand = Brand.find(params[:brand])
    @listings = @brand.unit_listings.includes(:property)
    render json: @listings
  end

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
    @listing = UnitListing.where(slug: params[:id]).includes({ property: [:location] }, { unit: [:bathrooms, :bedrooms, :reviews, :unit_availability, :unit_pricing] }).first
    render json: {
      id: @listing.id,
      slug: params[:id],
      currency: @listing.currency,
      multi_unit: @listing.is_multi_unit,
      room_type: @listing.is_room_type,
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

end
