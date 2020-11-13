# ================================================
# RUBY->MODEL->BRAND-INFO ========================
# ================================================
class BrandInfo < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand
  belongs_to :organization

  # ----------------------------------------------
  # ENUMS/CONSTANTS ------------------------------
  # ----------------------------------------------
  enum theme: [ :default, :default_mixed, :default_single_property ]

  # ----------------------------------------------
  # SERIALIZE ------------------------------------
  # ----------------------------------------------
  serialize :colors, JSON
  serialize :fonts, JSON
  serialize :social, JSON

  # ----------------------------------------------
  # JSON-OBJECTS ---------------------------------
  # ----------------------------------------------
  def set_default_info!
    colors = {
      "color_actions":    "#f69a1e",
      "color_background": "#f5f5f5",
      "color_highlight":  "#80cfdd",
      "color_links":      "#34adc3",
      "color_text":      "#1a1919",
    }
    fonts = {
      "font_body":        "Open+Sans",
      "font_buttons":     "Open+Sans",
      "font_headers":     "Abril+Fatface",
    }
    social = {
      "social_facebook":  "",
      "social_twitter":   "",
      "social_instagram": "",
      "social_pinterest":   "",
      "social_snapchat":  "",
    }
    update_attributes!(
      colors: colors,
      contact: contact,
      fonts: fonts,
      social: social,
      theme: 'default',
    )
  end

  # ----------------------------------------------
  # GOOGLE-FONT-URL ------------------------------
  # ----------------------------------------------
  def google_font_url
    "https://fonts.googleapis.com/css?family="+self.fonts['font_body']+":300,400,500,600|"+self.fonts['font_buttons']+"|"+self.fonts['font_headers']+":400,600"
  end

  # ----------------------------------------------
  # COLOR-ACTION-TEXT ----------------------------
  # ----------------------------------------------
  def color_action_text
    ("0x"+(self.colors['color_actions'][1,6]).to_s).hex > 0xffffff/2 ? '#000000' : '#ffffff'
  end

  # ----------------------------------------------
  # COLOR-HIGHLIGHT-TEXT -------------------------
  # ----------------------------------------------
  def color_highlight_text
    ("0x"+(self.colors['color_highlight'][1,6].to_s)).hex > 0xffffff/2 ? '#000000' : '#ffffff'
  end

  # ----------------------------------------------
  # LOGO-IMAGE-URL -------------------------------
  # ----------------------------------------------
  def logo_image_url
    brand_info_id = self.id.to_s.last(6)
    brand_info_id = brand_info_id.sub!(/^[0]+/,'')

    brand_id = self.brand.id.to_s.last(6)
    brand_id = brand_id.sub!(/^[0]+/,'')

    if self.created_at > "September 9, 2020"
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.brand.organization.subdomain}/brand/#{self.brand.id}/brand_info/logo_image/#{self.id}/#{self.logo_image}"
    else
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.brand.organization.subdomain}/brand/#{brand_id}/brand_info/logo_image/#{brand_info_id}/#{self.logo_image}"
    end
  end

  # ----------------------------------------------
  # FAVICON-IMAGE-URL ----------------------------
  # ----------------------------------------------
  def favicon_image_url
    brand_info_id = self.id.to_s.last(6)
    brand_info_id = brand_info_id.sub!(/^[0]+/,'')

    brand_id = self.brand.id.to_s.last(6)
    brand_id = brand_id.sub!(/^[0]+/,'')

    if self.created_at > "September 9, 2020"
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.brand.organization.subdomain}/brand/#{self.brand.id}/brand_info/logo_image/#{self.id}/#{self.favicon_image}"
    else
      return "https://versailles.s3.amazonaws.com/production/tenant/#{self.brand.organization.subdomain}/brand/#{brand_id}/brand_info/logo_image/#{brand_info_id}/#{self.favicon_image}"
    end
  end

end