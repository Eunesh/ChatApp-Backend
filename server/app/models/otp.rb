require 'securerandom'

class Otp < ApplicationRecord
  belongs_to :user
  before_create :generate_otp
  after_update :send_otp!
  after_create :send_otp!

  delegate :email, to: :user

  EXPIRATION_TIME = 3.minutes

  # For delivering email
  def send_otp!
    UserMailer.confirmation(self).deliver_later
  rescue StandardError => e
    Rails.logger.error("Error delivering OTP email: #{e.message}")
  end

  # For updating otp
  def update_otp!
    update(otp_key: random_number_generator, expired_at: Time.now + EXPIRATION_TIME)
  end

  def random_number_generator
    SecureRandom.random_number(1_000_000).to_s.rjust(6, '0')
  end

  private

  def generate_otp
    self.otp_key = random_number_generator
    self.expired_at = Time.now + EXPIRATION_TIME
  end
end
