# ================================================
# RUBY->MODEL->EMPLOYEE ==========================
# ================================================
class Employee < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :organization

  has_and_belongs_to_many :brands
  has_and_belongs_to_many :properties

  enum role: %i[organization_owner brand_owner property_manager property_contact housekeeping maintenance reservationist]
end