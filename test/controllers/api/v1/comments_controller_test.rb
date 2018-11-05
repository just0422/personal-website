require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest
	setup do
		@comment_one = comments(:one)
		@comment_two = comments(:two)
		@comment_four = comments(:four)

		@project = projects(:one)
		@project_comments = [comments(:one), comments(:two)]

		@experience = experiences(:one)
		@experience_comments = [comments(:one), comments(:four)]
	end

	def get_test(url, comments)
		get url, as: :json
		resp = JSON.parse(response.body)

		assert_equal 2, resp.length
		(0...resp.length).each do |i|
			assert comments.any?{ |comment| resp[i]["id"] == comment[:id] }
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

	def create_fail_test(url)
		assert_no_difference('Comment.count') do
			post url, params: {
				comment: {
					something: "else"
				}
			}, as: :json
		end

		assert_response :unprocessable_entity
	end

	test "should not create comments" do
		# Attempt to Create Experience Comment
		create_fail_test(api_v1_experience_comments_url(@experience))

		# Attempt to Create Project Comment
		create_fail_test(api_v1_project_comments_url(@project))
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
	
	def update_test(url, comment)
		patch url, params:{
			comment: {
				content: "#{comment[:content]}_1",
				something: "else"
			}
		}, as: :json

		resp = JSON.parse(response.body)
		assert_nil resp["something"]
		assert_not_equal comment[:content], resp["content"]
		assert_response :success
	end

	test "should update comment" do
		# Update experience comment
		update_test(api_v1_experience_comment_url(@experience, @comment_one), @comment_one)

		# Update project_comment
		update_test(api_v1_project_comment_url(@project, @comment_one), @comment_one)
	end
	
	def update_fail_test(url)
		patch url, params: {
			comment: {
				content: "ABCD"
			}
		}, as: :json

		assert_response :not_found
	end

	test "should not update comment" do
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
			delete url, as: :json
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
