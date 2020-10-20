# == Schema Information
#
# Table name: brand_headers
#
#  id              :bigint           not null, primary key
#  brand_id        :bigint
#  meta_tags       :jsonb
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  custom_html     :text
#  organization_id :integer
#

class BrandHeader < ApplicationRecord
  belongs_to :brand
end
