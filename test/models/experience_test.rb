require 'test_helper'

class ExperienceTest < ActiveSupport::TestCase
	setup do
		@experience = experiences(:one)
	end

	test 'valid experience' do
		assert @experience.valid?
	end

	test 'invalid without name' do
		@experience.name = nil
		refute @experience.valid?, 'Experience is valid without a name'
		assert_not_nil @experience.errors[:name], 'No validation error for name'
	end

	test 'invalid without title' do
		@experience.title = nil
		refute @experience.valid?, 'Experience is valid without a title'
		assert_not_nil @experience.errors[:title], 'No validation error for title'
	end

	test 'invalid without start' do
		@experience.start = nil
		refute @experience.valid?, 'Experience is valid without a start date'
		assert_not_nil @experience.errors[:start], 'No validation error for start'
	end

	test '#comments' do
		assert_equal 2, @experience.comments.size
	end

	test '#skills' do
		assert_equal 3, @experience.skills.size
	end
end
