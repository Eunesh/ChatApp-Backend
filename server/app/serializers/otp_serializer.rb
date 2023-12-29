class OtpSerializer < ActiveModel::Serializer
  attributes :id, :otp_key, :expired_at, :created_at
  belongs_to :user
end
