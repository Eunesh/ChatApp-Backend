class AddUserIdToOtps < ActiveRecord::Migration[7.1]
  def change
    add_column :otps, :user_id, :integer
  end
end
