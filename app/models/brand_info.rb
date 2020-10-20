class BrandInfo < ApplicationRecord
    connects_to database: { writing: :direct, reading: :direct_replica }
  belongs_to :brand
  belongs_to :organization

end