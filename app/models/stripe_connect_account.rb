# ================================================
# RUBY->MODEL->STRIPE-CONNECT-ACCOUNT =============
# ================================================
class StripeConnectAccount < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :organization

  has_many :portfolios, dependent: :nullify
  has_many :units, through: :portfolios

  # ----------------------------------------------
  # SCOPES ---------------------------------------
  # ----------------------------------------------
  scope :connected, -> { where.not(api_key: nil) }

  # ----------------------------------------------
  # ATTRIBUTES -----------------------------------
  # ----------------------------------------------
  ATTRIBUTES = [
    :access_token,
    :livemode,
    :refresh_token,
    :scope,
    :stripe_user_id,
    :stripe_publishable_key,
    :token_type
  ].freeze

  # ----------------------------------------------
  # CONNECTED ------------------------------------
  # ----------------------------------------------
  def connected?
    api_key.present?
  end

end
