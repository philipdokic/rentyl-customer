# ================================================
# RUBY->MODEL->LOCATION ==========================
# ================================================
class Location < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :locationable
  belongs_to :brand
  belongs_to :organization

  def obfuscated_address
    [adr_city, adr_state, adr_country].compact.join(', ')
  end
  
end