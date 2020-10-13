# ================================================
# RUBY->MODEL->BRAND =============================
# ================================================
class Brand < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :organization

  has_and_belongs_to_many :employees

  has_many :domains
  has_many :properties, -> { distinct }, through: :units
  has_many :unit_listings

end
