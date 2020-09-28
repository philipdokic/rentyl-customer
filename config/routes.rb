Rails.application.routes.draw do
  namespace :api do
    resources :organizations
    resources :listings, only: [:index, :show]
  end
  resources :users
  resources :employees
  resources :brands
  #resources :organizations
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'organizations#index'
end
