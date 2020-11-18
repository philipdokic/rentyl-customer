# ================================================
# RUBY->MODEL->UNIT-LISTINGS =====================
# ================================================
class UnitListing < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand
  belongs_to :organization
  belongs_to :unit

  has_one :property, through: :unit
  has_one :unit_availability, through: :unit
  has_one :unit_pricing, through: :unit

  has_many :bookings, dependent: :nullify
  has_many :deposits, through: :unit_pricing

end
