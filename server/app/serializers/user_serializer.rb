class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest, :confirmed_at
  has_one :otp
end
