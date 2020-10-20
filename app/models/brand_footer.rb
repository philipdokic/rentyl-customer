class BrandFooter < ApplicationRecord
  connects_to database: { writing: :direct, reading: :direct_replica }
  belongs_to :brand

end