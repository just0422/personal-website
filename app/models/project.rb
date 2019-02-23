class Project < ApplicationRecord
	has_and_belongs_to_many :skills
	has_many :comments, dependent: :destroy
	has_many :screenshots, dependend: :destroy

	validates :name, :start, :github_link, presence: true
	validates_associated :skills, if: Proc.new { |project| project.skills.present? }
	validates_associated :comments, if: Proc.new { |project| project.comments.present? }
end
