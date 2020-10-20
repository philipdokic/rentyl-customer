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
  has_one :location

end
