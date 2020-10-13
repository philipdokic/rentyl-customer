# ================================================
# RUBY->MODEL->PROPERTY ==========================
# ================================================
class Property < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand
  belongs_to :organization

  has_and_belongs_to_many :employees

  has_many :property_images, -> { order(:order) }, dependent: :destroy
  has_many :units, dependent: :destroy
  has_many :unit_images, through: :units
  has_many :unit_listings, through: :units

  has_one :location, as: :locationable, dependent: :destroy

  # ----------------------------------------------
  # GET-MANAGER ----------------------------------
  # ----------------------------------------------
  def get_manager
    if self.manager_info_visible?
      if self.employees.where(role: ['organization_owner','brand_owner','property_manager','property_contact']).length > 0
        property_manager = self.employees.where(role: ['organization_owner','brand_owner','property_manager','property_contact']).first
      elsif self.brand && self.brand.employees.where(role: ['organization_owner','brand_owner']).length > 0
        property_manager = self.brand.employees.where(role: ['organization_owner','brand_owner']).first
      else
        property_manager = self.organization.user
      end
    else
      property_manager = false
    end
    return property_manager
  end

end