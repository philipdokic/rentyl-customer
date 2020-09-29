Rails.application.routes.draw do

  root to: 'organizations#index'

  namespace :api do
    resources :organizations
    resources :listings, only: [:index, :show]
  end
  resources :brands
  #resources :organizations
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'organizations#index', via: :all
end
