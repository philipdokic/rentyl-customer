# ================================================
# RUBY->MODEL->EMPLOYEE ==========================
# ================================================
class Employee < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :organization

  has_and_belongs_to_many :brands
  has_and_belongs_to_many :properties

  enum role: %i[organization_owner brand_owner property_manager property_contact housekeeping maintenance reservationist]
end
