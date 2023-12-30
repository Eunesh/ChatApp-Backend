
class LoginsController < ApplicationController
  before_action :set_user, only: %i[user_login]

  # POST  /user_login
  def user_login
    # Authentic for checking hashed password
    return render json: { error: 'incorrect password' } unless @user.authenticate(login_params[:password])

    return render json: { error: 'Unconfirmed account' } unless @user.confirmed?

    created_jwt = encode(@user.id)

    cookies.signed[:user_jwt] = { value: created_jwt, httponly: true }  # Sending httponly cookie

    render json: { user: 'User exists' }, status: :ok
  end

  private

  def login_params
    params.require(:login).permit(:email, :password)
  end

  def set_user
    @user = User.find_by(email: login_params[:email])
    render json: { error: 'User not found' }, status: :not_found unless @user
  end
end
