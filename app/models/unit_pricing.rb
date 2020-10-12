# ================================================
# RUBY->MODEL->UNIT-PRICING ======================
# ================================================
class UnitPricing < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit

  has_many :unit_listings, through: :unit

  ATTRIBUTES = [
    :default_nightly_weekday,
    :default_nightly_weekend,
    :discount_full_week,
    :discount_full_month,
  ].freeze

  def average_default_nightly_price
    if self.is_incomplete?
      0
    else
      total = (((default_nightly_weekday * 5) + (default_nightly_weekend * 2)) / 7)
      total.round(2)
    end
  end

  def is_incomplete?
    default_nightly_weekday.nil? || default_nightly_weekday <= 1 || default_nightly_weekend.nil? || default_nightly_weekend <= 0
  end


end