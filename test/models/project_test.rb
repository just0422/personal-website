require 'test_helper'
require 'date'

class ProjectTest < ActiveSupport::TestCase
	setup do
		@project = projects(:one)
	end

	test 'valid project' do
		assert @project.valid?
	end

	test 'invalid without name' do
		@project.name = nil
		refute @project.valid?, 'Project is valid without a name'
		assert_not_nil @project.errors[:name], 'No validation error for name present'
	end

	test 'invalid without start' do
		@project.start = nil
		refute @project.valid?, 'Project is valid without a start date'
		assert_not_nil @project.errors[:start], 'No validation error for start present'
	end

	test '#comments' do
		assert_equal 2, @project.comments.size
	end

	test '#skills' do
		assert_equal 3, @project.skills.size
	end

	test '#screenshots' do
		assert_equal 2, @project.screenshots.size
	end
end
