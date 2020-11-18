Rails.application.routes.draw do

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
      post '/receipt/:booking_code', to: 'bookings#receipt'
      post '/payment/:booking_code', to: 'bookings#payment'
    end
  end
  resources :brands

  get '*path', to: 'organizations#index', via: :all #Comment this out to see routes in browser
end
