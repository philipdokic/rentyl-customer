# ================================================
# RUBY->CONTROLLER->ORGANIZATIONS ================
# ================================================
class Api::OrganizationsController < ApplicationController

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    render json: {
      brand: @brand,
      brand_info: @brand.brand_info,
      contact: @brand.brand_info.contact,
      header: @brand.brand_header,
      menu: menu_data
    }
  end

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
    build_featured_listing_models
    @homepage = @brand.brand_home_page
    render json:{
      canonical: request.original_url,
      brand: @brand,
      featured_listings: @featured_listings,
      featured_pages: @brand.featured_page_content,
      homepage: @homepage,
      hero_image: @homepage.hero_image,
      options: @homepage.options,
      payload: @homepage.payload,
      google_maps_api_key: ENV['GOOGLE_MAPS_API_KEY'],
      # slug: @brand.unit_listings.where(active:true).first&.slug,
      cities: @brand.city_options,
      intercom_id: @brand.brand_footer&.intercom_id,
      logo_image: @brand.brand_info.logo_image,
      footer: @brand.brand_footer,
      contact: @brand.brand_info.contact,
      social: @brand.brand_info.social,
      subdomain: @brand.organization.subdomain,
      brand_info: @brand.brand_info,
      menu: menu_data,
      theme: @theme,
      organization: @brand.organization,
      location: @brand.organization.location,
      header: @brand.brand_header,
      max_guests: @brand.max_guests,
      max_baths: @brand.max_baths,
      max_bedrooms: @brand.max_bedrooms,
      unit_id: params[:unit_id] ? params[:unit_id] : 0
  }
  end

  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # BUILD-FEATURED-LISTING-MODELS ----------------
  # ----------------------------------------------
  # TODO: refactor
  def build_featured_listing_models
    featured_listings = @brand.unit_listings.where(featured: true)
    featured_listings_info = []
    featured_listings.each do |l|
      l_obj = {}
      l_obj[:id] = l.id
      l_obj[:data] = l
      l_obj[:unit_name] = l.unit.name
      l_obj[:unit_type] = l.unit.unit_type
      l_obj[:num_units] = l.property.units.length
      l_obj[:property_name] = l.property.name
      l_obj[:property_type] = l.property.property_type
      l_obj[:location] = l.property.location
      l_obj[:guests] = l.unit.num_sleep
      l_obj[:slug] = l.slug
      l_obj[:multi_unit] = l.property.is_multi_unit?
      l_obj[:bathrooms] = l.unit.num_bathrooms
      l_obj[:bedrooms] = l.unit.num_bedrooms
      if(l.property.is_multi_unit?)
        if(l.unit.unit_images.length)
          l_obj[:image] = l.unit.featured_image
        elsif(l.property.property_images.length)
          l_obj[:image] = l.property.property_images.first
        end
      else
        if(l.property.property_images.length)
          l_obj[:image] = l.property.property_images.first
        elsif(l.unit.unit_images.length)
          l_obj[:image] = l.unit.featured_image
        end
      end
      featured_listings_info.push(l_obj)
    end
    @featured_listings = featured_listings_info
  end

  # ----------------------------------------------
  # MENU-DATA ------------------------------------
  # ----------------------------------------------
  def menu_data
    menu = @brand.menus.find_or_create_by(menu_type: 0, active: true)
    {
      id: menu.id,
      type: menu.menu_type,
      active: menu.active,
      menu_items: menu.menu_items.order(:position) || []
    }
  end

end
