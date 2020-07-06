Rails.application.routes.draw do
  root to: 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :tasks
    end
  end

  get '*path', to: 'tasks#index'

end
