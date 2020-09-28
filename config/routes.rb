Rails.application.routes.draw do

  namespace :api do
    resources :organizations
    resources :listings, only: [:index, :show]
  end

  root to: 'organizations#index'

end
