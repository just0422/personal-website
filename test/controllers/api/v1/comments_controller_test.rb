require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest
	setup do
		@comment_one = comments(:one)
		@comment_two = comments(:two)
		@comment_four = comments(:four)

		@experience = experiences(:one)
		@experience_comments = [comments(:one), comments(:four)]

		@project = projects(:one)
		@project_comments = [comments(:one), comments(:two)]
	end

	def get_test(url, comments)
		get url, as: :json
		resp = JSON.parse(response.body)

		assert_equal 2, resp.length
		(0...resp.length).each do |i|
			assert_equal resp[i]["id"], comments[i][:id]
		end

		assert_response :success
	end

	test "should get comments" do
		# Get Experience Comments
		get_test(api_v1_experience_comments_url(@experience), @experience_comments)

		# Get Project Comments
		get_test(api_v1_project_comments_url(@project), @project_comments)
	end

	def create_test(count, url)
		assert_difference('Comment.count') do
			assert_difference(count) do
				post url, params: {
					comment: {
						content: "abc"
					}
				}, as: :json
			end
		end

		assert_response :created
	end

	test "should create comments" do
		# Create Experience Comment
		create_test("Experience.find(#{@experience[:id]}).comments.count", api_v1_experience_comments_url(@experience))

		# Creat Project Comment
		create_test("Project.find(#{@project[:id]}).comments.count", api_v1_project_comments_url(@project))
	end

	def show_test(url)
		get url, as: :json
		resp = JSON.parse(response.body)

		assert_equal resp["id"], @comment_one[:id]
		assert_response :success
	end

	test "should show comments" do
		# Get Experience Comment
		show_test(api_v1_experience_comment_url(@experience, @comment_one))
		
		# Get Project Comment
		show_test(api_v1_project_comment_url(@project, @comment_one))
	end

	test "should not show comments" do
		# Attempt experience Comment
		get api_v1_experience_comment_url(@experience, -1)
		assert_response :not_found

		# Attempt Project Comment
		get api_v1_project_comment_url(@project, -1)
		assert_response :not_found
	end
	
	def update_test(url)
		patch url, params:{
			comment: {
				content: "AVCD",
				something: "else"
			}
		}, as: :json

		resp = JSON.parse(response.body)
		assert_nil resp["something"]
		assert_not_equal @comment_one[:content], resp["content"]
		assert_response :success
	end

	test "should update comment" do
		# Update experience comment
		update_test(api_v1_experience_comment_url(@experience, @comment_one))

		# Reset comment
		@comment_one[:content] = "MyText"

		# Update project_comment
		update_test(api_v1_project_comment_url(@project, @comment_one))
	end
	
	def update_fail_test(url)
		patch url, params: {
			comment: {
				content: "ABCD"
			}
		}, as: :json

		assert_response :not_found
	end

	test "should not update project" do
		# Experience update attempt should fail
		update_fail_test(api_v1_experience_comment_url(@experience, -1))


		# Project update attempt should fail
		update_fail_test(api_v1_project_comment_url(@project, -1))
	end
		
	def destroy_test(count, url)
		assert_difference('Comment.count', -1) do
			assert_difference(count, -1) do
				delete url, as: :json
			end
		end

		assert_response :no_content
	end

	test "should destroy comment" do
		# Destroy Experience Comment
		destroy_test("Experience.find(#{@experience[:id]}).comments.count", api_v1_experience_comment_url(@experience, @comment_four))

		# Destroy Project Comment
		destroy_test("Project.find(#{@project[:id]}).comments.count", api_v1_project_comment_url(@project, @comment_two))
	end
	
	def destroy_fail_test(url)
		assert_no_difference('Comment.count') do
			delete api_v1_project_url(-1), as: :json
		end

		assert_response :not_found
	end
	
	test "should not destroy comment" do
		# Attempt to destroy non-existent experience comment
		destroy_fail_test(api_v1_experience_comment_url(@experience, -1))

		# Attempt to destroy non-existent project comment
		destroy_fail_test(api_v1_project_comment_url(@project, -1))
	end
end
