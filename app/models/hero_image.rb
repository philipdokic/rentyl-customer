# ================================================
# RUBY->MODEL->HERO-IMAGE ========================
# ================================================
class HeroImage < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :hero_imageable

  # ----------------------------------------------
  # URL ------------------------------------------
  # ----------------------------------------------
  # "#{Rails.env}/tenant/#{model.tenant_id}/hero/#{model.class.to_s.underscore}/#{mounted_as}/#{id}"
  def url
    image_id = self.id.to_s.last(6)
    image_id = image_id.remove("0")

    if self.created_at > "September 1, 2020"
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.tenant_id}/hero/hero_image/image/#{self.id}/#{self.image}"
    else
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.tenant_id}/hero/hero_image/image/#{image_id}/#{self.image}"
    end
  end

end
