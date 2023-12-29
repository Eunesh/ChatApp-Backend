Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'users#home'
  # Setting all resource for users controller
  resources :users

  # Setting all resource for otps contoller
  resources :otps

  post '/verify_otp', to: 'otps#verify_otp'
  patch '/reload_otp', to: 'otps#reload_otp'
  post '/user_login', to: 'logins#user_login'
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  # Defines the root path route ("/")
  # root "posts#index"
end
