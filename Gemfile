source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3'

# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

gem 'pg', '~> 0.18'

# gem 'acts_as_tenant', git: 'https://github.com/ErwinM/acts_as_tenant.git'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

gem 'active_model_serializers', '~> 0.10.0'                                                         # Serialization for AM
gem 'acts_as_tenant', git: 'https://github.com/ErwinM/acts_as_tenant.git'                                                                               # Multitenant within one Schema
gem 'amoeba'                                                                                        # Deep-copying for Active Record
#gem 'apartment'                                                                                     # Multitenant support
#gem 'apartment-sidekiq'                                                                             # Multitenant Job backgrounding
gem 'awesome_print', require: 'ap'                                                                  # Formatted print for console output
gem 'aws-sdk'
gem 'cancancan', '~> 2.0'                                                                           # User permissions
gem 'carmen-rails', '~> 1.0.0'                                                                      # ISO Code Lookup
# gem 'carrierwave', github: 'carrierwaveuploader/carrierwave'                                        # Image uploading
# gem 'carrierwave-bombshelter'                                                                       # Image OOM error protection for CarrierWave
# gem 'carrierwave_backgrounder', git: 'https://github.com/lardawge/carrierwave_backgrounder.git' # Background processing for CarrierWave
# gem 'devise' # User authentication
gem 'dotenv-rails', groups: %i[development test] # Environment variables in dev and test
gem 'faker'                                                                                         # Create fake data for testing / startup
gem 'figaro'                                                                                        # Local ENV variables
gem 'fog-aws'                                                                                       # S3 uploading for CarrierWave
gem 'geocoder'                                                                                      # For geocoding/reverse-geocoding address/lat-lon info
gem 'geokit-rails'                                                                                  # For geolocation lookup / distance search
gem 'hashdiff'
gem 'hirb'                                                                                          # Better DB output in IRB
gem 'honeybadger', '~> 4.0'                                                                         # HoneyBadger for error monitoring
gem 'httparty'                                                                                      # Easy cURL commands
gem 'i18n-js'                                                                                       # For passing i18n to JavaScript (React) views
gem 'icalendar'                                                                                     # Exporter for iCal format
gem 'iso_country_codes'                                                                             # Lookup of two-digit and three-digit ISO codes
gem 'jwt'
gem 'mini_magick'                                                                                   # Image processing for CarrierWave
gem 'money-rails', '~>1.13.2'
gem 'nokogiri'                                                                                      # HTML, XML, SAX, and Reader parsers (XPath and CSS selector support)
gem 'numbers_and_words'
gem 'oauth2'                                                                                        # oAuth2 for Stripe
gem 'omniauth-facebook'                                                                             # For facebook oAuth login
gem 'paper_trail'                                                                                   # Track changes to model data
gem 'pdfkit'
gem 'platform-api'                                                                                  # Heroku platform API integration for Heroku commands from Ruby
gem 'premailer-rails'                                                                               # CSS styling of emails without required inlining
gem 'pusher' # Pusher is for sending response from a job
gem 'rack-cors', require: 'rack/cors' # Rack cross-origin implementation
gem 'rails-controller-testing' # Testing controllers in RSpec
gem 'react_on_rails', '11.3.0' # React rendering
gem 'redis-rails'                                                                                   # Redis store setup and configuration
gem 'scout_apm'
gem 'sidekiq'                                                                                       # Job backgrounding
gem 'sidekiq-history'
gem 'simple_form' # Easier form gereration
gem 'stripe', git: 'https://github.com/stripe/stripe-ruby' # Stripe, for credit card processing
gem 'stripe-ruby-mock', '~> 2.5.0', require: 'stripe_mock'
gem 'textacular', '~> 5.0'
gem 'timezone', '~> 1.0'
gem 'uri-query_params' # Parse query params from URI
gem 'wkhtmltopdf-binary', '0.12.3' # (this gem is deprecated)

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3', '~> 1.4'
  gem 'dotenv-rails' # Environment variables in dev and test
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

group :production do
end
