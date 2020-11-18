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
  # SCOPES------------------------------------
  # ----------------------------------------------
  scope :still_active, -> { where(cancelled: false, archived: false).where('check_out > ?', Date.today - 1.day) }

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
  
  # ----------------------------------------------
  # CREATE-BOOKING-RANGE -------------------------
  # ----------------------------------------------
  def self.create_booking_range(check_in, check_out)
    return if check_in.blank? || check_out.blank?

    (check_in..check_out).map do |date|
      {
        'key' => date.strftime('%d-%m-%Y'),
        'day' => date.wday
      }
    end
  end

end