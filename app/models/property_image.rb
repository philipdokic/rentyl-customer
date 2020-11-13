# ================================================
# RUBY->MODEL->PROPERTY-IMAGE ====================
# ================================================
class PropertyImage < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :property

  ATTRIBUTES = [
    :property_image_url
  ]

  # ----------------------------------------------
  # PROPERTY-IMAGE-URL ---------------------------
  # ----------------------------------------------
  def property_image_url
    image_id = self.id.to_s.last(6)
    image_id = image_id.sub!(/^[0]+/,'')

    property_id = self.property.id.to_s.last(6)
    property_id = property_id.sub!(/^[0]+/,'')

    if self.created_at > "September 9, 2020"
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{self.property.id}/property_image/image/#{self.id}/#{self.image}"
    else
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{property_id}/property_image/image/#{image_id}/#{self.image}"
    end
  end

end