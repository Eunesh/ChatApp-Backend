class Api::AuthsController < ApplicationController
  before_action :authenticate_user, only: [:auth?]
  # Delete /logout
  def logout
    cookies&.delete(:user_jwt)
    render json: { cookies: 'Cookies is deleted' }, status: :ok
  end

  # Get /is_auth
  def auth?
    render json: @user_id, status: :ok
  end
end
