# == Schema Information
#
# Table name: rental_agreements
#
#  id              :bigint           not null, primary key
#  pdf             :string
#  pdf_processing  :boolean          default(FALSE), not null
#  brand_id        :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :integer
#  short_url       :string
#

class RentalAgreement < ApplicationRecord
  belongs_to :brand
end
