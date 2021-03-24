# ================================================
# RUBY->MODEL->ORGANIZATION ======================
# ================================================
class Organization < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :user

  has_many :brands, dependent: :destroy
  has_many :employees, dependent: :destroy
  has_many :stripe_connect_accounts, dependent: :destroy
  has_many :stripe_bank_accounts, through: :stripe_connect_accounts
  has_one :location

  # ----------------------------------------------
  # DEFAULT-STRIPE-CONNECT-ACCOUNT ---------------
  # ----------------------------------------------
  def default_stripe_connect_account
    stripe_connect_accounts.order(:id).first
  end

end
