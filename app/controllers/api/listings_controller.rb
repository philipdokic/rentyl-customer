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
    @listing = UnitListing.where(slug: params[:id]).includes({ property: [:location, :property_images] }, { unit: [:bathrooms, :bedrooms, :reviews, :unit_availability, :unit_images, :unit_pricing] }).first

    # Property Images
    property_images = @listing.property.property_images
    property_images_url = []
    property_images.each do |p|
      p_obj = {}
      p_obj[:url] = p.property_image_url
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
      u_obj[:url] = u.unit_image_url
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
      unit: @listing.unit,
      property: @listing.property,
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
      average_default_nightly_price: @listing.unit_pricing.average_default_nightly_price
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

end
