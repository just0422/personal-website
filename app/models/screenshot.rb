class Screenshot < ApplicationRecord
	include ImageUploader[:image]

	belongs_to :project, optional: true

	validates :title, presence: true
	validates :image_data, presence: true
end
