# ================================================
# RUBY->MODEL->DOMAIN ============================
# ================================================
class Deposit < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit_pricing

end
