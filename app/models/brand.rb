class Brand < ApplicationRecord
  connects_to database: { reading: :direct }
end
