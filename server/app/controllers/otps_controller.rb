class OtpsController < ApplicationController
  # GET /otps
  def index
    @otp = Otp.all
    render json: @otp
  end

  # POST /verify_otp
  def verify_otp
    @user = User.find_by(email: otp_params[:email]) # findbyemail,@user.confirm

    return render json: { error: 'User not found' }, status: :not_found unless @user

    return @user.confirm! if @user.otp&.otp_key == otp_params[:otp] && expire_date_checker(@user.otp&.expired_at)

    render json: { error: 'Invalid or Expired Otp ' }, status: :unprocessable_entity
  end

  def expire_date_checker(expired_at_date)
    Time.current < expired_at_date
  end

  private

  def otp_params
    params.permit(:otp, :email)
  end
end
