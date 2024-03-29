class Api::OtpsController < ApplicationController
  before_action :set_user, only: %i[verify_otp reload_otp]

  # POST /verify_otp
  def verify_otp
    if @user.otp_key == otp_params[:otp] && @user.expire_date_checker(@user.expired_at)
      @user.confirm!
      render json: { message: 'User is confirmed' }, status: :ok
      return
    end

    render json: { error: 'Invalid or Expired Otp ' }, status: :unprocessable_entity
  end

  # PATCH  /reload_otp
  def reload_otp
    return render json: { error: 'User is already confirmed' }, status: :unprocessable_entity if @user.confirmed?

    @user.otp.update_otp!
    render json: { message: 'OTP updated successfully' }, status: :ok
  end

  private

  def set_user
    @user = User.find_by(email: otp_params[:email])
    render json: { error: 'User not found' }, status: :not_found unless @user
  end

  def otp_params
    params.permit(:otp, :email)
  end
end
