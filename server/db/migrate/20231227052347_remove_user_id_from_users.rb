class RemoveUserIdFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :user_id, :integer
  end
end
