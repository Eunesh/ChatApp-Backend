class Otp < ApplicationRecord
  belongs_to :user
  before_create :generate_otp

  delegate :email, to: :user

  # For delivering email
  def send_otp!
    UserMailer.confirmation(self).deliver_later
  end

  private

  def generate_otp
    self.otp_key = rand.to_s[2..7]
    self.expired_at = Time.now + 3.minutes
  end
end
