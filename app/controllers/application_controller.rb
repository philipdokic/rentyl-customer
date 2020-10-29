# ================================================
# RUBY->CONTROLLER->APPLICATION ==================
# ================================================
class ApplicationController < ActionController::Base

  before_action :get_brand

  puts @brand

  private

  def get_brand
    request_host = request.host
    domain = Domain.find_by(url: request_host)
    @brand = domain.brand
  end

end
