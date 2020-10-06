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

  has_many :unit_images, -> { order(:order) }, dependent: :destroy
  has_many :unit_listings, dependent: :destroy

end