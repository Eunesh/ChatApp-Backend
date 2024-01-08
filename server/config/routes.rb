Rails.application.routes.draw do
  root 'users#home'
  mount ActionCable.server => '/chats' # For websocket

  namespace :api do
    resources :users
    resources :otps
    post '/verify_otp', to: 'otps#verify_otp'
    patch '/reload_otp', to: 'otps#reload_otp'
    post '/user_login', to: 'logins#user_login'
    delete '/logout', to: 'auths#logout'
    get '/is_auth', to: 'auths#auth?'
    post '/create_message', to: 'messages#create_message' # resource
    get '/specific_message/:sender/:receiver', to: 'messages#specific_message', as: 'specific_message'
    post 'upload_image', to: 'messages#upload_image'
  end
end
