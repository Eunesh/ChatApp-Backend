class AddImagesToMessgs < ActiveRecord::Migration[7.1]
  def change
    add_column :messgs, :images, :text, array: true, default: []
  end
end
