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

end