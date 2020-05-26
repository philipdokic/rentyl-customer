class BrandsController < ApplicationController
  before_action :set_brand

  # GET /brands
  # GET /brands.json
  def index
    @brands = Brand.all
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_brand
      @brand = Brand.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def brand_params
      params.fetch(:brand, {})
    end
end
