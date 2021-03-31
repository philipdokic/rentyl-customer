# == Schema Information
#
# Table name: menu_items
#
#  id              :bigint           not null, primary key
#  menu_id         :bigint
#  title           :string
#  position        :integer
#  visible         :boolean
#  slug            :string
#  targetable_type :string
#  targetable_id   :bigint
#  parent_id       :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :integer
#

# ================================================
# RUBY->MODEL->MENU-ITEM =========================
# ================================================
class MenuItem < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :menu
  belongs_to :targetable, polymorphic: true

end
