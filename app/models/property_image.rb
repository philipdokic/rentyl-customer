# ================================================
# RUBY->MODEL->PROPERTY-IMAGE ====================
# ================================================
class PropertyImage < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :property

  ATTRIBUTES = [
    :property_image_urls
  ]

  # ----------------------------------------------
  # PROPERTY-IMAGE-URLS --------------------------
  # ----------------------------------------------
  def property_image_urls
    image_id = self.id.to_s.last(6)
    image_id = image_id.to_i.to_s

    property_id = self.property.id.to_s.last(6)
    property_id = property_id.to_i.to_s

    return {
      original: "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{property_id}/property_image/image/#{image_id}/#{self.image}",
      xlarge: "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{property_id}/property_image/image/#{image_id}/xlarge_#{self.image}",
      large: "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{property_id}/property_image/image/#{image_id}/large_#{self.image}",
      medium: "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{property_id}/property_image/image/#{image_id}/medium_#{self.image}",
      small: "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{property_id}/property_image/image/#{image_id}/small_#{self.image}",
      tiny: "https://versailles.s3.amazonaws.com/production/tenant/#{self.property.organization.subdomain}/property/#{property_id}/property_image/image/#{image_id}/tiny_#{self.image}"
    }
  end

end
