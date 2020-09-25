class Api::OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]

  # GET /organizations
  # GET /organizations.json
  def index
    request_host = request.host
    domain = Domain.find_by(url: request_host)
    @brand = domain.brand
    render json: @brand
    end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.fetch(:organization, {})
    end
end
