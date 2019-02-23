require 'test_helper'

class ScreenshotsControllerTest < ActionDispatch::IntegrationTest
	setup do
		@screenshot_one = screenshots(:one)
		@screenshot_two = screenshots(:two)

		@project = projects(:one)
		@project_screenshots = [screenshots(:one), screenshots(:two)]
	end

	def get_test(url, screenshots)
		get url, as: :json
		resp = JSON.parse(response.body)

		assert_equal 2, resp.length
		(0...resp.length).each do |i|
			assert screenshots.any?{ |screenshot| resp[i]["id"] == screenshot[:id] }
		end

		assert_response :success
	end

	test "should get screenshots" do
		# Get Project screenshots
		get_test(api_v1_project_screenshots_url(@project), @project_screenshots)
	end

	def create_test(count, url)
		assert_difference('Screenshot.count') do
			assert_difference(count) do
				post url, params: {
					screenshot: {
						title: "abc",
						image_data: "abcd"
					}
				}, as: :json
			end
		end

		assert_response :created
	end

	test "should create screenshots" do
		# Creat Project screenshot
		create_test("Project.find(#{@project[:id]}).screenshots.count", api_v1_project_screenshots_url(@project))
	end

	def create_fail_test(url)
		assert_no_difference('Screenshot.count') do
			post url, params: {
				screenshot: {
					something: "else"
				}
			}, as: :json
		end

		assert_response :unprocessable_entity
	end

	test "should not create screenshots" do
		# Attempt to Create Project screenshot
		create_fail_test(api_v1_project_screenshots_url(@project))
	end

	def show_test(url)
		get url, as: :json
		resp = JSON.parse(response.body)

		assert_equal resp["id"], @screenshot_one[:id]
		assert_response :success
	end

	test "should show screenshots" do
		# Get Project screenshot
		show_test(api_v1_project_screenshot_url(@project, @screenshot_one))
	end

	test "should not show screenshots" do
		# Attempt Project screenshot
		get api_v1_project_screenshot_url(@project, -1)
		assert_response :not_found
	end
	
	def update_test(url, screenshot)
		patch url, params:{
			screenshot: {
				title: "#{screenshot[:title]}_1",
				something: "else"
			}
		}, as: :json

		resp = JSON.parse(response.body)
		assert_nil resp["something"]
		assert_not_equal screenshot[:title], resp["title"]
		assert_response :success
	end

	test "should update screenshot" do
		# Update project_screenshot
		update_test(api_v1_project_screenshot_url(@project, @screenshot_one), @screenshot_one)
	end
	
	def update_fail_test(url)
		patch url, params: {
			screenshot: {
				title: "ABCD"
			}
		}, as: :json

		assert_response :not_found
	end

	test "should not update screenshot" do
		# Project update attempt should fail
		update_fail_test(api_v1_project_screenshot_url(@project, -1))
	end
		
	def destroy_test(count, url)
		assert_difference('Screenshot.count', -1) do
			assert_difference(count, -1) do
				delete url, as: :json
			end
		end

		assert_response :no_content
	end

	test "should destroy screenshot" do
		# Destroy Project screenshot
		destroy_test("Project.find(#{@project[:id]}).screenshots.count", api_v1_project_screenshot_url(@project, @screenshot_two))
	end
	
	def destroy_fail_test(url)
		assert_no_difference('Screenshot.count') do
			delete url, as: :json
		end

		assert_response :not_found
	end
	
	test "should not destroy screenshot" do
		# Attempt to destroy non-existent project screenshot
		destroy_fail_test(api_v1_project_screenshot_url(@project, -1))
	end
end
