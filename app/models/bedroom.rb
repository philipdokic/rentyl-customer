# ================================================
# RUBY->MODEL->BEDROOM ===========================
# ================================================
class Bedroom < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit

  # ----------------------------------------------
  # ENUMS/CONSTANTS ------------------------------
  # ----------------------------------------------
  enum bedroom_type: %i[bedroom living_sleeping other_sleeping]

  # ----------------------------------------------
  # SERIALIZE ------------------------------------
  # ----------------------------------------------
  serialize :amenities, JSON

end