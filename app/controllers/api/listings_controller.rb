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
    puts "HIT"

    puts params
    @brand = Brand.find(params[:brand])
    puts @brand.inspect
    puts @brand.unit_listings.size
    @listings = @brand.unit_listings
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
  def set_brand
    @listing = UnitListing.find(params[:id])
  end

  # # Only allow a list of trusted parameters through.
  # def organization_params
  #   params.fetch(:organization, {})
  # end
end
