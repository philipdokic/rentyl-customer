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

class MenuItem < ApplicationRecord
  belongs_to :menu
  belongs_to :targetable, polymorphic: true
end
