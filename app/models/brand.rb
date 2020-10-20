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

  has_many :brand_pages
  has_many :domains
  has_many :unit_listings
  has_many :units, -> { distinct }, through: :unit_listings
  has_many :properties, -> { distinct }, through: :units
  has_many :menus
  has_one :brand_footer
  has_one :brand_header
  has_one :brand_info
  has_one :brand_home_page
  has_one :location
  
  def featured_page_content
    if(fp_array = featured_pages)
      fp_links = []
      fp_array.each do |fp|
        fp_obj = {
          name: fp.title,
          url: "/pages/" + fp.slug,
          image: fp.hero_image,
          description: fp.description.truncate(225)
        }
        fp_links.push(fp_obj)
      end
      fp_links
    else
      nil
    end
  end

  def featured_pages
    brand_pages.includes(:hero_image).where(published:true, featured: true)
  end

  def city_options
    return [] if brand_home_page.blank? || (home_search_type != 'dropdown' && home_search_type != 'custom')
    home_search_type == 'custom' ? custom_city_options : default_city_options
  end

  def home_search_type
    return if brand_home_page.blank?
    return if brand_home_page.options['location_search'] != 'true'

    brand_home_page.options['location_search_type']
  end

  def max_guests
    units.map(&:num_sleep).max
  end

  def max_baths
    units.where('num_bathrooms > 0').map(&:num_bathrooms).max
  end

  def max_bedrooms
    units.where('num_bedrooms > 0').map(&:num_bedrooms).max
  end
end
