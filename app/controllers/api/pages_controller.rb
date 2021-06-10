# ================================================
# RUBY->CONTROLLER->PAGES ========================
# ================================================
class Api::PagesController < ApplicationController

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # SHOW -----------------------------------------
  # ----------------------------------------------
  def show
    @page = @brand.brand_pages.where(published: true, slug: params[:id]).first
    render json: {
      brand: @brand,
      hero_image: @page&.hero_image&.url,
      page: @page,
      payload: @page&.payload,
      intercom_id: @brand.brand_footer&.intercom_id
    }
  end

end