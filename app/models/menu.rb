# == Schema Information
#
# Table name: menus
#
#  id              :bigint           not null, primary key
#  brand_id        :bigint
#  menu_type       :integer
#  active          :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :integer
#

# ================================================
# RUBY->MODEL->MENU ==============================
# ================================================
class Menu < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :organization
  belongs_to :brand

  has_many :menu_items

end
