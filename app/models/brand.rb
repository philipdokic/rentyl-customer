class Brand < ApplicationRecord
  # self.abstract_class = true
  connects_to database: { writing: :direct, reading: :direct_replica }
  belongs_to :organization
  has_many :domains
  has_many :unit_listings

end
