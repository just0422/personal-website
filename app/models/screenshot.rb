class Screenshot < ApplicationRecord
	belongs_to :project, optional: true

	validates :title, presence: true
	validates :image_data, presence: true
end
