# ================================================
# RUBY->MODEL->DOMAIN ============================
# ================================================
class Deposit < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit_pricing

end
