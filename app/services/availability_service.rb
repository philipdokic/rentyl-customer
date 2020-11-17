class AvailabilityService
  def initialize(unit, check_in, check_out, num_adults=1, num_children=0, num_pets=0, booking_code_to_exclude = nil)
    # Required Params
    @unit = unit
    @check_in  = check_in.is_a?(String)  ? Date.parse(check_in)  : check_in
    @check_out = check_out.is_a?(String) ? Date.parse(check_out) : check_out
    @booking_range = Booking.create_booking_range(@check_in, @check_out)

    # Optional Params
    @num_adults = num_adults.to_i
    @num_children = num_children.to_i
    @num_guests = @num_adults + @num_children
    @num_pets = num_pets.to_i
    @booking_code_to_exclude = booking_code_to_exclude
    @errors = []
  end

  def check
    return { "errorCode": 'UNKNOWN_PROPERTY', "message": 'This property has been removed from our database.' } if @unit.blank?

    # Check for possible issues
    build_errors

    if errors.any?
      error = errors.first
      return { "unitId": @unit.id, "available": false, "errorCode": error[:error_type] }
    else
      return { "unitId": @unit.id, "available": true }
    end
  end

  def booked?
    !@unit.vacant_for_stay?(@booking_range)
  end

  def bookable?
    check.with_indifferent_access[:available] || false
  end

  def available?
    @unit.available_for_stay?(@booking_range)
  end

  def can_stay?
    @unit.minimum_stay_met?(@booking_range) && @unit.maximum_stay_met?(@booking_range)
  end

  def instant_bookable?
    @unit.availability_calendar_rules(@booking_range) == 'available'
  end

  def build_errors
    @error_hash = {
      :unknown_property => { error_type: "UNKNOWN_PROPERTY", error_code: "", count: "", day_of_week: "", message: "" },
      :exceeds_max_stay => { error_type: "EXCEEDS_MAX_STAY", error_code: "", count: "", day_of_week: "", message: "" },
      :prop_unavailable => { error_type: "PROPERTY_NOT_AVAILABLE", error_code: "", count: "", day_of_week: "", message: "" },
      :min_stay_not_met => { error_type: "MIN_STAY_NOT_MET", error_code: "", count: "", day_of_week: "", message: "" },
      :c_o_day_mismatch => { error_type: "CHANGE_OVER_DAY_MISMATCH", error_code: "", count: "", day_of_week: "", message: "" },
      :check_in_mismatch => { error_type: "START_DAY_MISMATCH", error_code: "", count: "", day_of_week: "", message: "" },
      :check_out_mismatch => { error_type: "END_DAY_MISMATCH", error_code: "", count: "", day_of_week: "", message: "" },
      :exceeds_max_occy => { error_type: "EXCEEDS_MAX_OCCUPANCY", error_code: "", count: "", day_of_week: "", message: "This property cannot accommodate the number of travelers selected." },
      :pets_not_allowed => { error_type: "PETS_NOT_ALLOWED", error_code: "", count: "", day_of_week: "", message: "" }
    }

    unless @unit.available_for_stay?(@booking_range)
      error = @error_hash[:prop_unavailable]
      error[:message] = "This property is unavailable for the dates specified."
      @errors << error
    end

    unless @unit.vacant_for_stay?(@booking_range, @booking_code_to_exclude)
      error = @error_hash[:prop_unavailable]
      error[:message] = "This property is unavailable for the dates specified."
      @errors << error
    end

    unless @unit.can_fit_guests(@num_guests)
      count = @unit.num_sleep.to_i
      error = @error_hash[:exceeds_max_occy]
      error[:message] = "This property can only accommodate #{count} travelers."
      error[:count] = count
      @errors << error
    end

    unless @unit.minimum_stay_met?(@booking_range)
      count = @unit.minimum_stay(@booking_range).to_i
      error = @error_hash[:min_stay_not_met]
      error[:message] = "This property requires a minimum stay of #{count} days."
      error[:count] = count
      @errors << error
    end

    unless @unit.maximum_stay_met?(@booking_range)
      count = @unit.maximum_stay(@booking_range).to_i
      error = @error_hash[:exceeds_max_stay]
      error[:message] = "This property has a maximum stay of #{count} days."
      error[:count] = count
      @errors << error
    end

    unless @unit.can_check_in_on?(@booking_range.first)
      @errors << @error_hash[:check_in_mismatch]
    end

    unless @unit.can_check_out_on?(@booking_range.last)
      @errors << @error_hash[:check_out_mismatch]
    end

    if @num_pets > 0 && @unit.allows_pets? == false
      @errors << @error_hash[:pets_not_allowed]
    end
  end

  def build_availability_json(unit_external_id)
    # ONLY USED FOR HOMEAWAY
    unit_json = {}
    if errors.any?
      error = errors.first
      unit_json = { "unitExternalId": unit_external_id, "available": false, "errorCode": error[:error_type] }
    else
      unit_json = { "unitExternalId": unit_external_id, "available": true }
    end

    unit_json
  end

  def error_hash
    @error_hash
  end

  def errors
    @errors
  end
end
