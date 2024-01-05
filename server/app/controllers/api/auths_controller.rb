class Api::AuthsController < ApplicationController
  before_action :authenticate_user, only: [:auth?]
  # Delete /logout
  def logout
    cookies.delete(:user_jwt)
    render json: { cookies: 'Cookies is deleted' }, status: :ok
  rescue StandardError # Safe Navigation
    render json: { error: 'Error while Deleting cookie' }, status: :conflict
  end

  # Get /is_auth
  def auth?
    render json: @user_id, status: :ok
  end
end
