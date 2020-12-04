# ================================================
# RUBY->CONTROLLER->PROPERTIES ===================
# ================================================
class Api::PropertiesController < ApplicationController

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    render json:{
      results: search_service.call,
      min_price: search_service.min_max_unit_prices['min']&.floor.to_i,
      max_price: search_service.min_max_unit_prices['max']&.ceil.to_i,
      total_pages: search_service.filtered_properties.pluck(:id).uniq.count / params[:limit].to_i + 1,
      total_properties: search_service.filtered_properties.pluck(:id).uniq.count,
      sort: params[:sort] || 'default',
      bounds: search_service.bounds,
      center: search_service.center,
      max_bedrooms: search_service.max_bedrooms,
      max_baths: search_service.max_baths,
      max_guests: search_service.max_guests
    }
  end

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
    @property = Property.find(params[:id])
  end

  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # SEARCH-SERVICE -------------------------------
  # ----------------------------------------------
  def search_service
    @search_service ||= Search::Properties.new(
      params,
      @brand
    )
  end

end