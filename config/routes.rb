Rails.application.routes.draw do

  root to: 'organizations#index'

  namespace :api, { defaults: { format: :json } } do
    resources :organizations
    resources :listings, only: [:index, :show]
    resources :properties, only: [:index, :show]
    scope '/bookings' do
      post '/checkout/:listing_id', to: 'bookings#checkout'
      post '/receipt/:booking_code', to: 'bookings#receipt'
      post '/payment/:booking_code', to: 'bookings#payment'
    end
  end
  resources :brands

  get '*path', to: 'organizations#index', via: :all #Comment this out to see routes in browser
end
