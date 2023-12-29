class CreateOtps < ActiveRecord::Migration[7.1]
  def change
    create_table :otps do |t|
      t.string :otp_key
      t.datetime :expired_at

      t.timestamps
    end
  end
end
