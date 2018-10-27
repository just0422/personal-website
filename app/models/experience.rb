class Experience < ApplicationRecord
	has_and_belongs_to_many :skills
	has_many :comments

	validates :name, :title, :start, presence: true
	validates_associated :skills, if: Proc.new { |project| project.skills.present? }
	validates_associated :comments, if: Proc.new { |project| project.comments.present? }
end
