class RemoveIndexFromTable < ActiveRecord::Migration[7.1]
  def change
    remove_index :otps, name: 'index_otps_on_otp_key'
  end
end
