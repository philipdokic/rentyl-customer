# ================================================
# RUBY->CONTROLLER->ORGANIZATIONS ================
# ================================================
class OrganizationsController < ApplicationController

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # CATCH-ALL-REDIRECT ---------------------------
  # ----------------------------------------------
  def catch_all_redirect
    puts "HIT"
    puts request.host
    puts request.fullpath
    legacy_redirect = LegacyRedirect.from_host_and_path(
      request.host,
      request.fullpath
    )

    if legacy_redirect.blank?
      puts "BLANK"
      puts legacy_redirect.inspect
      redirect_to '/'
      return
    end

    redirect_to legacy_redirect.redirect_to, status: :moved_permanently
  end

end
