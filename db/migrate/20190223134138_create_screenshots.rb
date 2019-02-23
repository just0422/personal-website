class CreateScreenshots < ActiveRecord::Migration[5.2]
  def change
    create_table :screenshots do |t|
      t.string :title
      t.text :image_data
			t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
