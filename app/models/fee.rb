# frozen_string_literal: true

# == Schema Information
#
# Table name: fees
#
#  id                    :bigint           not null, primary key
#  name                  :string
#  description           :text
#  unit_listing_id       :bigint
#  calculation_type      :integer
#  calculation_amount    :decimal(, )
#  refundable            :boolean
#  taxable               :boolean
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  is_addon              :string
#  normalized_fee_name   :string
#  organization_id       :integer
#  unit_pricing_id       :bigint
#  fee_account_id        :bigint
#  frequency             :integer          default("per_stay")
#  included_in_base_rent :boolean
#  internal_use_only     :boolean          default(FALSE)
#  realization_type      :integer          default("not_applicable")
#  split                 :string           default("no")
#  cancellation          :boolean          default(FALSE)
#

class Fee < ApplicationRecord
  belongs_to :unit_pricing

  def all_outside_base_rent_with_addons
    # Use this version of fees if needing to allow guests to choose
    # which fees they would like to add on

    # Will include all possible fees:
    #  * fees that are mandatory
    #  * addon fees that are included for billing
    #  * addon fees that are not included for billing

    # Will NOT include:
    #  * fees that are included in the base rent
    #  * internal use only fees

    # Use in conjunction with subtotal_with_agg_fees usually
    binding.remote_pry
    [
      all_outside_base_rent,
      build_fees(@addon_fees)
    ].compact.flatten
  end

  def all_outside_base_rent
    # Use this version of fees for displaying to guests fees, but you
    # don't want to display the aggregate fees that are included in the
    # subtotal/room rate. Do not include addons unless the guest already
    # chose them

    # Will NOT include:
    #  * internal use only fees

    # Use in conjunction with subtotal_with_agg_fees usually
    base_fees = if @channel_id.to_i.positive?
                  build_fees(@fees.outside_base_rent_or_flat_included)
                else
                  build_fees(@fees.all_fees_outside_base_rent)
                end

    [base_fees, additional_guest_fee].compact.flatten
  end

  def build_fees(fees)
    fee_array = []
    fees.each do |fee|
      fee_additional_data = fee_additional_data(fee)
      fee_account_data = fee_account_data(fee)
      fee_array.push({
        'id': fee['id'],
        'description': fee['description'],
        'name': fee['name'],
        'taxable': fee['taxable'],
        'value': fee_account_data['variable'] != false ? fee_value(fee) : calc_los_amount(fee_additional_data[:los_ranges_at_creation], fee_value(fee)),
        'is_addon': fee['is_addon'],
        'calculation_amount': fee['calculation_amount'],
        'calculation_type': fee['calculation_type'],
        'unit_pricing_id': fee['unit_pricing_id'],
        'refundable': fee['refundable'],
        'created_at': fee['created_at'],
        'updated_at': fee['updated_at'],
        'fee_account_id': fee['fee_account_id'],
        'frequency': fee['frequency'],
        'split': fee['split'],
        'included_in_base_rent': fee['included_in_base_rent'],
        'additional_data': fee_additional_data,
        'fee_account': fee_account_data
      }.with_indifferent_access)
    end

    fee_array
  end
end
