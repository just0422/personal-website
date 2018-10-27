class Comment < ApplicationRecord
  belongs_to :project, optional: true
  belongs_to :experience, optional: true

  validates :content, presence: true
end
