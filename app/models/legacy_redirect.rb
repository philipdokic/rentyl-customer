class LegacyRedirect < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand

  enum creation_method: %i[manual import automatic]

  # host is the domain
  # path is everything after the domain, including url params
  def self.from_host_and_path(host, path)
    LegacyRedirect.joins(brand: :domains)
                  .find_by("
                    domains.url = '#{host}' AND
                    redirect_from = '#{path}' AND
                    redirect_to IS NOT NULL AND
                    redirect_to != ''
                  ")
  rescue ActiveRecord::StatementInvalid => _e
    nil
  end
end