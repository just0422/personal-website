require 'test_helper'

class SkillTest < ActiveSupport::TestCase
	setup do
		@skill = skills(:one)
	end

	test 'valid skill' do
		assert @skill.valid?
	end

	test 'invalid without name' do
		@skill.name = nil
		refute @skill.valid?, 'Skill is valid without name'
		assert_not_nil @skill.errors[:name]
	end
end
