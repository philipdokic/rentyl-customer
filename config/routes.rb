Rails.application.routes.draw do
  resources :organizations
  resources :brands
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'organizations#index'
end
