Rails.application.routes.draw do

  root to: 'organizations#index'

  namespace :api, { defaults: { format: :json } } do
    resources :organizations
    resources :listings, only: [:index, :show]
    resources :pages, only: [:show]
    resources :properties, only: [:index, :show]
  end
  resources :brands

  get '*path', to: 'organizations#index', via: :all #Comment this out to see routes in browser
end
