require 'test_helper'

class CommentTest < ActiveSupport::TestCase
	setup do
		@comment = comments(:one)
	end

	test 'valid skill' do
		assert @comment.valid?
	end

	test 'invalid without content' do
		@comment.content = nil
		refute @comment.valid?, 'Comment is valid without content'
		assert_not_nil @comment.errors[:content], 'No validation error for comment'
	end
end
