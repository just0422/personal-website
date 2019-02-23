require 'test_helper'

class ScreenshotTest < ActiveSupport::TestCase
	setup do
		@screenshot = screenshots(:one)
	end

	test 'valid screenshot' do
		assert @screenshot.valid?
	end

	test 'invalid wihtout title' do
		@screenshot.title = nil
		refute @screenshot.valid?, 'Screenshot is valid without title'
		assert_not_nil @screenshot.errors[:title]
	end

	test 'invalid wihtout image_data' do
		@screenshot.image_data = nil
		refute @screenshot.valid?, 'Screenshot is valid without image_data'
		assert_not_nil @screenshot.errors[:image_data]
	end
end
