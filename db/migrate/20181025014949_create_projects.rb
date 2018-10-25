class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.datetime :start
      t.datetime :end
      t.string :demo_link
      t.string :github_link

      t.timestamps
    end
  end
end
