# ================================================
# RUBY->MODEL->DOMAIN ============================
# ================================================
class Domain < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :organization
  belongs_to :brand

end
