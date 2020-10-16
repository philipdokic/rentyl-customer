# ================================================
# RUBY->MODEL->BOOKING ===========================
# ================================================
class Booking < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit_listing

  has_one :unit, through: :unit_listing
  has_one :property, through: :unit

  # ----------------------------------------------
  # SERIALIZE ------------------------------------
  # ----------------------------------------------
  serialize :booking_range, JSON

  # ----------------------------------------------
  # ATTRIBUTES -----------------------------------
  # ----------------------------------------------
  ATTRIBUTES = %i[
    archived
    booking_code
    cancelled
    check_in
    check_out
    confirmed
    generated_as_type
    num_guests
    price_paid
    price_total
    stripe_customer_id
  ].freeze

end