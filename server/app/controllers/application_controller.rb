class ApplicationController < ActionController::API
  include ::ActionController::Cookies # For accessing cookies
  before_action :check_secret_key, only: %i[authenticate_user]
  SECRET_KEY = ENV['SECRET_KEY']

  def authenticate_user
    jwt = cookies.signed[:user_jwt] # Getting jwt token from cookies
    @user_id = Jwt::JwtService.decode(jwt)
  rescue JWT::DecodeError
    render json: { decode: 'Decode failed' }, status: :unauthorized
  end

  private

  def check_secret_key
    render json: { error: 'Secret key not found' }, status: :internal_server_error unless SECRET_KEY
  end
end
