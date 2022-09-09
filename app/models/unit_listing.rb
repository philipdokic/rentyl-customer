# ================================================
# RUBY->MODEL->UNIT-LISTINGS =====================
# ================================================
class UnitListing < ApplicationRecord
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

  # ----------------------------------------------
  # ENUMS/CONSTANTS ------------------------------
  # ----------------------------------------------
  enum refund_policy: %i[custom no_refund full day7 day30 day45 day60 day90], _prefix: true
  enum airbnb_refund_policy: %i[flexible moderate strict_14_with_grace_period super_strict_30 super_strict_60], _prefix: true
  enum booking_dot_com_refund_policy: %i[no_refund full day7 day30 day42 day60], _prefix: true
  enum homeaway_refund_policy: %i[no_refund relaxed moderate firm strict custom], _prefix: true

end
