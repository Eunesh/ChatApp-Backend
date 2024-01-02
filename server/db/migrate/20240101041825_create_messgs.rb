class CreateMessgs < ActiveRecord::Migration[7.1]
  def change
    create_table :messgs do |t|
      t.text :message
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.references :reciever, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
