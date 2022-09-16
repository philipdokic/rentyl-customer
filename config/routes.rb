Rails.application.routes.draw do

  get '/robots.:format', to: 'robots#robots'
  root to: 'organizations#index'

  namespace :api, { defaults: { format: :json } } do
    resources :organizations
    resources :listings, only: [:index, :show]
    resources :pages, only: [:show]
    resources :properties, only: [:index, :show]
    scope '/bookings' do
      post '/checkout/:listing_id', to: 'bookings#checkout'
      post '/checkout/:listing_id/availability', to: 'bookings#checkout_availability'
      post '/checkout/:listing_id/pricing', to: 'bookings#checkout_pricing'
    end
  end
  resources :brands

  get '*path', to: 'organizations#index', via: :all #Comment this out to see routes in browser

  # REDIRECTS
  get '/(*path)', to: 'organizations#catch_all_redirect'
end
