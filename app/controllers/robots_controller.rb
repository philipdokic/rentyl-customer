# Solution based on this article:
# https://solidfoundationwebdev.com/blog/posts/how-to-create-a-dynamic-robots-txt-in-rails

class RobotsController < ApplicationController
  layout false

  def robots
    @brand = get_brand_by_domain
    @robots = @brand&.brand_info&.robots

    respond_to :text
    expires_in 6.hours, public: true

    render 'robots/robots.html.erb'
  end

  def get_brand_by_domain
    domain ||= Domain.where(url: request.host).first
    if !domain.nil? && domain.live?
      domain.brand
    else
      nil
    end
  end
end
