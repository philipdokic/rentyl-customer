Rails.application.routes.draw do

  root to: 'organizations#index'

  namespace :api, { defaults: { format: :json } } do
    resources :organizations
    resources :listings, only: [:index, :show]
    resources :properties, only: [:index, :show]
  end
  resources :brands
  #resources :organizations
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'organizations#index', via: :all #Comment this out to see routes
end
