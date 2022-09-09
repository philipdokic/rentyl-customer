# ================================================
# RUBY->MODEL->PROPERTY ==========================
# ================================================
class Property < ApplicationRecord
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
  # ENUMS/CONSTANTS ------------------------------
  # ----------------------------------------------
  enum property_type: [:apartment, :apartment_building, :barn, :boat, :bnb, :bnb_unit, :building, :bungalow, :cabin, :caravan, :castle, :chacara, :chalet, :chateau, :condo, :condo_building, :condo_hotel, :condo_hotel_unit, :cottage, :estate, :farmhouse, :guesthouse, :hotel, :hotel_unit, :house, :house_boat, :lodge, :mas, :mill, :mobile_home, :recreational_vehicle, :riad, :studio, :tower, :townhome, :villa, :yacht]

  # ----------------------------------------------
  # SERIALIZE ------------------------------------
  # ----------------------------------------------
  serialize :features_adventure, JSON
  serialize :features_attractions, JSON
  serialize :features_car, JSON
  serialize :features_leisure, JSON
  serialize :features_local, JSON
  serialize :features_location, JSON

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

  # ----------------------------------------------
  # FEATURED-IMAGE -------------------------------
  # ----------------------------------------------
  def featured_image
    property_images.first.property_image_urls if property_images.first.present?
  end

  # ----------------------------------------------
  # IS-MULTI-UNIT --------------------------------
  # ----------------------------------------------
  def is_multi_unit?
    multi_unit || units.length > 1
  end

end
