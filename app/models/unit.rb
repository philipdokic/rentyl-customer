# ================================================
# RUBY->MODEL->UNIT ==============================
# ================================================
class Unit < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand
  belongs_to :organization
  belongs_to :property

  has_many :bathrooms, -> { order(:created_at) }, dependent: :destroy
  has_many :bedrooms, -> { order(:created_at) }, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :unit_images, -> { order(:order) }, dependent: :destroy
  has_many :unit_listings, dependent: :destroy
  has_many :bookings, through: :unit_listings

  has_one :unit_availability, dependent: :destroy
  has_one :unit_pricing, dependent: :destroy

  def featured_image
    property.multi_unit ? unit_images.first : property.featured_image
  end

end