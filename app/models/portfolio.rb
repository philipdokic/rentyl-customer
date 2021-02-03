# ================================================
# RUBY->MODEL->PORTFOLIO =========================
# ================================================
class Portfolio < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :stripe_connect_account

  has_many :units, dependent: :nullify
  has_many :properties, through: :units

end