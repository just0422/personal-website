class AddExperienceToComment < ActiveRecord::Migration[5.2]
  def change
    add_reference :comments, :experience, foreign_key: true
  end
end
