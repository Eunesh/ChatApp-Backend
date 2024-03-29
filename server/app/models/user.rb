class User < ApplicationRecord

  CONFIRMATION_TOKEN_EXPIRATION = 10.minutes

  has_one :otp, dependent: :destroy

  has_secure_password # For hashing password with bcrypt on password_digest column

  before_create :downcase_email # For downcasing email before saving in database

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true

  validates :password, presence: true, length: { minimum: 8 }, on: :create

  after_create :generate_otp

  delegate :otp_key, :expired_at, to: :otp

  def confirm!
    update_columns(confirmed_at: Time.current) # update_column is used to update certain columns in table
  end

  def confirmed?
    confirmed_at.present? # Checking if confirmed_at column is null or not
  end

  def expire_date_checker(expired_at_date)
    Time.current < expired_at_date
  end

  private

  def downcase_email
    self.email = email.downcase
  end

  def generate_otp
    Otp.create!(user: self)
  end
end
