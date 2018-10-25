class CreateJoinTableExperienceSkill < ActiveRecord::Migration[5.2]
  def change
    create_join_table :experiences, :skills do |t|
      # t.index [:experience_id, :skill_id]
      # t.index [:skill_id, :experience_id]
    end
  end
end
