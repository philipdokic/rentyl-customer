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

  # ----------------------------------------------
  # FEATURED-IMAGE -------------------------------
  # ----------------------------------------------
  def featured_image
    unit_images.first.unit_image_urls if unit_images.first.present?
  end

  def vacant_for_stay?(booking_range, booking_code_to_exclude = nil)
    (booked_dates(booking_code_to_exclude) & booking_range).empty?
  end

  def available_for_stay?(booking_range)
    # Each date in the booking_range must be available or inquiry
    availabilities = booking_range.each.map { |date| availability_for_date(date) }.uniq
    availabilities.include?('unavailable') == false
  end

  def availability_for_date(date)
    (custom_availability(date) || default_availability(date))['availability']
  end

  def custom_availability(date)
    custom_date_object = unit_availability.availability_calendar[date['key']]
    return custom_date_object if custom_date_object.blank? || custom_date_object['availability'] == 'unavailable'

    if date['key'].to_date < Date.today + custom_date_object['priorNotifyMin'].to_i
      custom_date_object['availability'] = 'inquiry'
    end

    custom_date_object
  end

  def default_availability(date)
    unit_availability.default_availability_changeover[date['day']]
  end

  def booked_dates(booking_code_to_exclude = nil)
    bookings.still_active
            .where.not(booking_code: booking_code_to_exclude)
            .map { |b| b.booking_range[1...-1] }.flatten
  end

  def can_fit_guests(guests)
    guests.to_i <= num_sleep
  end

  def minimum_stay_met?(booking_range)
    length_of_stay = booking_range.length - 1
    check_in = booking_range[0]['key']
    if (specific_rules = unit_availability.availability_calendar[check_in])
      length_of_stay >= specific_rules['stayMin'].to_i
    else
      length_of_stay >= unit_availability.default_stay_min.to_i
    end
  end

  def maximum_stay_met?(booking_range)
    length_of_stay = booking_range.length - 1
    check_in = booking_range[0]['key']
    if (specific_rules = unit_availability.availability_calendar[check_in])
      length_of_stay <= specific_rules['stayMax'].to_i
    else
      length_of_stay <= unit_availability.default_stay_max.to_i
    end
  end

  def can_check_in_on?(check_in)
    changeover = (unit_availability.availability_calendar[check_in['key']] || unit_availability.default_availability_changeover[check_in['day']])['changeover']
    case
    when changeover == 'check_out'
      false
    when changeover != 'none'
      true
    else
      false
    end
  end

  def can_check_out_on?(check_out)
    changeover = (unit_availability.availability_calendar[check_out['key']] || unit_availability.default_availability_changeover[check_out['day']])['changeover']
    case
    when changeover == 'check_in'
      false
    when changeover != 'none'
      true
    else
      false
    end
  end

  def availability_calendar_rules(booking_range)
    stay_range = booking_range.dup # create a copy of booking_range
    stay_range.pop # and pop the last item

    availability_terms = stay_range.map { |date| availability_for_date(date) }
    if availability_terms.include?('unavailable')
      'unavailable'
    elsif availability_terms.include?('inquiry')
      'inquiry'
    else
      'available'
    end
  end

  def changeover_calendar_rules(booking_range)
    check_in = booking_range.first.with_indifferent_access
    check_out = booking_range.last.with_indifferent_access
    calendar = unit_availability.availability_calendar || {}
    defaults = unit_availability.default_availability_changeover

    [
      calendar[check_in['key']] ? calendar[check_in['key']]['changeover'] : defaults[check_in['day']]['changeover'],
      calendar[check_out['key']] ? calendar[check_out['key']]['changeover'] : defaults[check_out['day']]['changeover']
    ]
  end

end
