class Skill < ApplicationRecord
  has_and_belongs_to_many :projects
  has_and_belongs_to_many :experiences

  validates :name, presence: true
end
