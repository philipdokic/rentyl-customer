# ================================================
# RUBY->CONTROLLER->ORGANIZATIONS ================
# ================================================
class OrganizationsController < ApplicationController

  # ----------------------------------------------
  # CALLBACKS ------------------------------------
  # ----------------------------------------------
  before_action :catch_all_redirect

  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # CATCH-ALL-REDIRECT ---------------------------
  # ----------------------------------------------
  def catch_all_redirect
    legacy_redirect = LegacyRedirect.from_host_and_path(
      request.host,
      request.fullpath
    )

    if legacy_redirect.present?
      redirect_to legacy_redirect.redirect_to and return
    end
  end

end
