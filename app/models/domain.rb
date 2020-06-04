class Domain < ApplicationRecord
  # self.abstract_class = true
  connects_to database: { writing: :direct, reading: :direct_replica }
  belongs_to :organization
  belongs_to :brand

end
