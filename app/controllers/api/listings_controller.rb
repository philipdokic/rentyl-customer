# ================================================
# RUBY->CONTROLLER->LISTINGS =====================
# ================================================
class Api::ListingsController < ApplicationController

  # ----------------------------------------------
  # CALLBACKS ------------------------------------
  # ----------------------------------------------
  # before_action :set_brand, only: [:index]
  #before_action :set_listing, only: [:show]

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    @brand = Brand.find(params[:brand])
    @listings = @brand.unit_listings
    render :json => @listings
  end

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
  end

  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # SET-BRAND ------------------------------------
  # ----------------------------------------------
  def set_brand
    @brand = Brand.find(params[:brand])
  end

  # ----------------------------------------------
  # SET-LISTING ----------------------------------
  # ----------------------------------------------
  def set_listing
    @listing = UnitListing.find(params[:id])
  end

end
