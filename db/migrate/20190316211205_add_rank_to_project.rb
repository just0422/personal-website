class AddRankToProject < ActiveRecord::Migration[5.2]
  def change
		add_column :projects, :rank, :integer
		add_column :experiences, :rank, :integer
  end
end
