class CreateExperiences < ActiveRecord::Migration[5.2]
  def change
    create_table :experiences do |t|
      t.string :name
      t.string :title
      t.datetime :start
      t.datetime :end

      t.timestamps
    end
  end
end
