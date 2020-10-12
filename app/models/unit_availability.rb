# ================================================
# RUBY->MODEL->UNIT-AVAILABILITY =================
# ================================================
class UnitAvailability < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit


  # ----------------------------------------------
  # SERIALIZE ------------------------------------
  # ----------------------------------------------
  serialize :availability_calendar, JSON
  serialize :booking_calendar, JSON
  serialize :default_availability_changeover, JSON


  # ----------------------------------------------
  # CALLBACKS ------------------------------------
  # ----------------------------------------------
  # after_save { UnitPricing.where(unit: unit).touch_all }
  # after_save { unit&.unit_listings&.touch_all }
  # after_save { unit&.touch_no_callbacks }
  # after_save { unit&.property&.touch_no_callbacks }
  # after_update :update_room_type_calendar

  ATTRIBUTES = [
    :check_in_check_out_policy,
    :default_prior_notify_min,
    :default_stay_max,
    :default_stay_min,
    :default_time_check_in,
    :default_time_check_out,
  ].freeze

  def set_default_attributes!
    set_default_prior_and_stay!
    set_default_availability_changeover!
    set_default_booking_calendar!
  end

  def update_room_type_calendar
    return if unit.nil? || unit.calendar.nil?
    return if unit&.calendar&.id.nil?

    CalendarUpdateJob.perform_later(unit.calendar.id)
  end

  def booking_calendar_override
    return {} if unit.blank?

    calendar = {}
    unit.bookings.where(cancelled: false, archived: false).pluck(:booking_code, :booking_range).each do |booking|
      booking_code = booking[0]
      check_in = booking[1].shift
      check_out = booking[1].size > 0 ? booking[1].pop : check_in
      middle_dates = booking[1]

      check_in_calendar_day = calendar[check_in["key"]]
      if check_in_calendar_day && check_in_calendar_day['status'] == 'check_out'
        check_in_calendar_day['status'] = 'check_in_out'
      else
        check_in_calendar_day = { "booking_code" => booking_code, "status" => "check_in" }
      end
      calendar[check_in['key']] = check_in_calendar_day

      middle_dates.map { |d| calendar[d["key"]] = {"booking_code" => booking_code, "status" => "blocked"} }

      check_out_calendar_day = calendar[check_out["key"]]
      if check_out_calendar_day && check_out_calendar_day['status'] == 'check_in'
        check_out_calendar_day['status'] = 'check_in_out'
      else
        check_out_calendar_day = { "booking_code" => booking_code, "status" => "check_out" }
      end
      calendar[check_out['key']] = check_out_calendar_day
    end

    calendar
  end

  def combined_availability_calendar(years=3, excluded_defaults = %w[available inquiry])
    combined_availability_calendar = {}
    start_date = Date.today
    end_date = start_date + years.year - 1.day
    start_date.upto(end_date) do |date|
      formatted_date = date.strftime("%d-%m-%Y")
      if (availability_calendar[formatted_date].present?)
        combined_availability_calendar[formatted_date] = availability_calendar[formatted_date]
      elsif excluded_defaults.include? default_availability_changeover[date.wday]['availability']
        combined_availability_calendar[formatted_date] = default_availability_changeover[date.wday]
      end
    end
    combined_availability_calendar
  end

  def available_30_days?
    unavailable_days = combined_availability_calendar(1, %w[available inquiry unavailable]).values.select { |day| %w[unavailable inquiry].include? day['availability'] }.length
    365 - unavailable_days >= 30
  end

  def cx_availability_calendar
    cx_availability_calendar = combined_availability_calendar
    cx_availability_calendar.merge(booking_calendar)
  end

  def standard_check_in_time(check_in_time = default_time_check_in)
    return '3:00 PM' if check_in_time.blank?

    DirectDates.military_to_standard(check_in_time)
  end

  def standard_check_out_time(check_out_time = default_time_check_out)
    return '12:00 PM' if check_out_time.blank?

    DirectDates.military_to_standard(check_out_time)
  end

  def convert_availability(dry_run=false)
    # First, remove all availability_calendar dates blocked due to a booking
    # r = unit.bookings.pluck(:booking_range).flatten.map { |b| b["key"] }
    # adjusted_calendar = availability_calendar.except(*r)
    adjusted_calendar = availability_calendar.dup

    # Determine what would have been the IN and OUT dates
    in_dates_available, in_dates_inquiry, out_dates_available, out_dates_inquiry = get_in_and_out_dates(adjusted_calendar)

    in_dates_available.each do |in_date|
      if adjusted_calendar.has_key?(in_date)
        adjusted_calendar[in_date]["availability"] = "available"
        adjusted_calendar[in_date]["changeover"] = "check_out"
      else
        adjusted_calendar[in_date] = {
          "availability"=>"available",
          "changeover"=>"check_out",
          "priorNotifyMin"=> default_prior_notify_min,
          "stayMin"=> default_stay_min,
          "stayMax"=> default_stay_max,
          "timeCheckIn"=> default_time_check_in,
          "timeCheckOut"=> default_time_check_out,
          "note"=>""
        }
      end
    end

    in_dates_inquiry.each do |in_date|
      if adjusted_calendar.has_key?(in_date)
        adjusted_calendar[in_date]["availability"] = "inquiry"
        adjusted_calendar[in_date]["changeover"] = "check_out"
      else
        adjusted_calendar[in_date] = {
          "availability"=>"inquiry",
          "changeover"=>"check_out",
          "priorNotifyMin"=> default_prior_notify_min,
          "stayMin"=> default_stay_min,
          "stayMax"=> default_stay_max,
          "timeCheckIn"=> default_time_check_in,
          "timeCheckOut"=> default_time_check_out,
          "note"=>""
        }
      end
    end

    out_dates_available.each do |out_date|
      if adjusted_calendar.has_key?(out_date)
        adjusted_calendar[out_date]["availability"] = "available"
        adjusted_calendar[out_date]["changeover"] = "check_in"
      else
        adjusted_calendar[out_date] = {
          "availability"=>"available",
          "changeover"=>"check_in",
          "priorNotifyMin"=> default_prior_notify_min,
          "stayMin"=> default_stay_min,
          "stayMax"=> default_stay_max,
          "timeCheckIn"=> default_time_check_in,
          "timeCheckOut"=> default_time_check_out,
          "note"=>""
        }
      end
    end

    out_dates_inquiry.each do |out_date|
      if adjusted_calendar.has_key?(out_date)
        adjusted_calendar[out_date]["availability"] = "inquiry"
        adjusted_calendar[out_date]["changeover"] = "check_in"
      else
        adjusted_calendar[out_date] = {
          "availability"=>"inquiry",
          "changeover"=>"check_in",
          "priorNotifyMin"=> default_prior_notify_min,
          "stayMin"=> default_stay_min,
          "stayMax"=> default_stay_max,
          "timeCheckIn"=> default_time_check_in,
          "timeCheckOut"=> default_time_check_out,
          "note"=>""
        }
      end
    end

    return adjusted_calendar if dry_run

    # Update the availability calendar with the modified calendar obj
    update(availability_calendar: adjusted_calendar)
  end

  def get_in_and_out_dates(calendar)
    in_dates_available = []
    in_dates_inquiry = []
    out_dates_available = []
    out_dates_inquiry = []
    calendar.keys.sort_by { |k| Date.parse(k) }.each_with_index do |k,i|

      date = Date.parse(k)
      prev_key = (date - 1.days).strftime("%d-%m-%Y")
      next_key = (date + 1.days).strftime("%d-%m-%Y")

      availability = calendar[k]["availability"]
      prev_availability = (calendar[prev_key] || default_availability_changeover[(date - 1.days).wday])["availability"]
      next_availability = (calendar[next_key] || default_availability_changeover[(date + 1.days).wday])["availability"]

      # When the date we're looking at is unavailable and the prior date is available
      # we will consider that an "IN" date
      if availability == "unavailable" && prev_availability == "available"
        in_dates_available << k

      elsif availability == "unavailable" && prev_availability == "inquiry"
        in_dates_inquiry << k

      elsif availability == "unavailable" && next_availability == "available"
        out_dates_available << next_key

      elsif availability == "unavailable" && next_availability == "inquiry"
        out_dates_inquiry << next_key
      end
    end

    [in_dates_available, in_dates_inquiry, out_dates_available, out_dates_inquiry]
  end

  private

  def set_default_prior_and_stay!
    update_attributes!(
      default_prior_notify_min: 0,
      default_stay_max: 7,
      default_stay_min: 1,
    )
  end

  def set_default_availability_changeover!
    default_availability_changeover = [
      { "day": "Sunday", "availability": "available", "changeover": "any"},
      { "day": "Monday", "availability": "available", "changeover": "any"},
      { "day": "Tuesday", "availability": "available", "changeover": "any"},
      { "day": "Wednesday", "availability": "available", "changeover": "any"},
      { "day": "Thursday", "availability": "available", "changeover": "any"},
      { "day": "Friday", "availability": "available", "changeover": "any"},
      { "day": "Saturday", "availability": "available", "changeover": "any"},
    ]
    update_attributes!(
      availability_calendar: {},
      default_availability_changeover: default_availability_changeover,
    )
  end

  def set_default_booking_calendar!
    update_attributes!(
      booking_calendar: {},
    )
  end

  alias booking_calendar booking_calendar_override

end