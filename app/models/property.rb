# ================================================
# RUBY->MODEL->PROPERTY ==========================
# ================================================
class Property < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand
  belongs_to :organization

  has_many :property_images, -> { order(:order) }, dependent: :destroy
  has_many :units, dependent: :destroy
  has_many :unit_images, through: :units
  has_many :unit_listings, through: :units

end