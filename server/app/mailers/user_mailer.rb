class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.Confirmation.subject
  #
  def confirmation(otp)
    @otp = otp
    mail(to: otp.email, subject: 'Confirmation OTP') do |format|
      format.html { render html: "Your Otp ----> #{otp.otp_key} valid until 3 minutes please hurry up" }
      format.text { render plain: 'Confirmation email content in plain text' }
    end
  end
end
