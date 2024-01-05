class ApplicationController < ActionController::API
  include ::ActionController::Cookies # For accessing cookies
  before_action :check_secret_key, only: %i[encode authenticate_user]
  SECRET_KEY = ENV['SECRET_KEY']

  # For creating jwt token
  def encode(payload)
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  # For Decoding token
  def decode(token)
    user_id = JWT.decode(token, SECRET_KEY, 'HS256')
    { user_id: user_id[0] }
  rescue JWT::DecodeError
    render json: { decode: 'Decode failed' }, status: :forbidden
  end

  def authenticate_user
    jwt = cookies.signed[:user_jwt] # Getting jwt token from cookies
    @user_id = decode(jwt)
  end

  private

  def check_secret_key
    render json: { error: 'Secret key not found' }, status: :internal_server_error unless SECRET_KEY
  end
end
