class BrandHomePage < ApplicationRecord
  connects_to database: { writing: :direct, reading: :direct_replica }
  belongs_to :brand
  has_one :hero_image, as: :hero_imageable
end