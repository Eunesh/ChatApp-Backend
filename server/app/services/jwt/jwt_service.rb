# frozen_string_literal: true

module Jwt
  class JwtService
    SECRET_KEY = ENV['SECRET_KEY']
    # For creating jwt token
    def self.encode(payload)
      JWT.encode(payload, SECRET_KEY, 'HS256')
    end

    # For Decoding token
    def self.decode(token)
      user_id = JWT.decode(token, SECRET_KEY, 'HS256')
      { user_id: user_id[0] }
    end
  end
end
