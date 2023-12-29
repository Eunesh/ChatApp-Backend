class OtpsController < ApplicationController
  before_action :set_user, only: %i[verify_otp reload_otp]

  # GET /otps
  def index
    @otp = Otp.all
    render json: @otp
  end

  # POST /verify_otp
  def verify_otp
    return @user.confirm! if @user&.otp_key == otp_params[:otp] && expire_date_checker(@user&.expired_at)

    render json: { error: 'Invalid or Expired Otp ' }, status: :unprocessable_entity
  end

  def expire_date_checker(expired_at_date)
    Time.current < expired_at_date
  end

  # PATCH  /reload_otp
  def reload_otp
    return @user.otp.update_otp! unless @user.confirmed? # Again Updating new otp

    render json: { error: 'Your account is already confirmed' }, status: :not_acceptable
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
