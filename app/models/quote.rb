class Quote < ApplicationRecord
    # ----------------------------------------------
    # DATABASE -------------------------------------
    # ----------------------------------------------
    connects_to database: { writing: :direct, reading: :direct_replica }
end