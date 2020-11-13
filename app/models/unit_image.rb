# ================================================
# RUBY->MODEL->UNIT-IMAGE ========================
# ================================================
class UnitImage < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit

  # ----------------------------------------------
  # UNIT-IMAGE-URL -------------------------------
  # ----------------------------------------------
  def unit_image_url
    image_id = self.id.to_s.last(6)
    image_id = image_id.sub!(/^[0]+/,'')

    unit_id = self.unit.id.to_s.last(6)
    unit_id = unit_id.sub!(/^[0]+/,'')

    if self.created_at > "September 9, 2020"
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{self.unit.id}/unit_image/image/#{self.id}/#{self.image}"
    else
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{unit_id}/unit_image/image/#{image_id}/#{self.image}"
    end
  end

end