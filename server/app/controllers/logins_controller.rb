class LoginsController < ApplicationController
  # POST  /user_login
  def user_login
    @user = User.find_by(email: login_params[:email])
    return render json: { error: 'User not found' }, status: :not_found unless @user

    # Authentic for checking hashed password
    return render json: { error: 'incorrect password' } unless @user.authenticate(login_params[:password])

    return render json: { error: 'Unconfirmed account' } unless @user.confirmed?

    render json: { user: 'User exists' }, status: :ok
  end

  def login_params
    params.require(:login).permit(:email, :password)
  end
end
