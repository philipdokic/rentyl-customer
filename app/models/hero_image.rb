# == Schema Information
#
# Table name: hero_images
#
#  id                  :bigint           not null, primary key
#  tenant_id           :string
#  image               :string
#  image_processing    :boolean          default(FALSE), not null
#  hero_imageable_type :string
#  hero_imageable_id   :bigint
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  organization_id     :integer
#

class HeroImage < ApplicationRecord
  belongs_to :hero_imageable
  
  def is_uploaded
    image.file.exists?
  end
end
