class User < ApplicationRecord

  CONFIRMATION_TOKEN_EXPIRATION = 10.minutes

  has_one :otp, dependent: :destroy

  has_secure_password # For hashing password with bcrypt on password_digest column

  before_save :downcase_email # For hashing password with bcrypt on password_digest column

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true

  validates :password, presence: true, length: { minimum: 8 }

  after_create :generate_otp

  delegate :otp_key, :expired_at, to: :otp

  def confirm!
    update_columns(confirmed_at: Time.current) # update_column is used to update certain columns in table
  end

  def confirmed?
    confirmed_at.present? # Checking if confirmed_at column is null or not
  end

  # signed in method is used to generate a cryptographically signed identifier
  def generate_confirmation_token
    signed_id expires_in: CONFIRMATION_TOKEN_EXPIRATION, purpose: :confirm_email
  end

  private

  def downcase_email
    self.email = email.downcase
  end

  def generate_otp
    Otp.create!(user: self)
  end
end
