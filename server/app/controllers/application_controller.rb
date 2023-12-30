class ApplicationController < ActionController::API
  include ::ActionController::Cookies # For accessing cookies

  # For creating jwt token
  def encode(payload)
    secret_key = ENV['SECRET_KEY']
    return nil unless secret_key

    JWT.encode(payload, secret_key, 'HS256')
  end

  # For Decoding token
  def decode(token)
    secret_key = ENV['SECRET_KEY']
    return nil unless secret_key

    JWT.decode(token, secret_key, algorithm: 'HS256')
  rescue JWT::DecodeError
    nil
  end
end
