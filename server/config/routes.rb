Rails.application.routes.draw do
  root 'users#home'
  mount ActionCable.server => '/chats' # For websocket

  namespace :api do
    resources :users, only: %i[index create show]
    resource :messages, only: [:create]
    post '/verify_otp', to: 'otps#verify_otp'
    patch '/reload_otp', to: 'otps#reload_otp'
    post '/user_login', to: 'logins#user_login'
    delete '/logout', to: 'auths#logout'
    get '/is_auth', to: 'auths#auth?'
    get '/specific_message/:sender/:receiver', to: 'messages#specific_message', as: 'specific_message'
    post 'upload_image', to: 'messages#upload_image'
  end
end
