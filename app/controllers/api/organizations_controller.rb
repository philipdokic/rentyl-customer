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
    request_host = request.host
    domain = Domain.find_by(url: request_host)
    @brand = domain.brand

    render json: @brand
  end

end
