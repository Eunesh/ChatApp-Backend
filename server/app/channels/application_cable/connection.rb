module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      self.current_user = User.find_by(id: user[:user_id])
    end

    private

    def user
      jwt = cookies.signed[:user_jwt] # Getting jwt token from cookies
      @user_id = Jwt::JwtService.decode(jwt)
    rescue JWT::DecodeError
      Rails.logger.error 'User is not authenticated'
    end
  end
end
