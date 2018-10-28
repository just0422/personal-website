require 'test_helper'

class ExperienceControllerTest < ActionDispatch::IntegrationTest
	setup do
		@experiences = [experiences(:one), experiences(:two)]
		@experience_one = experiences(:one)
	end

	test "should get index" do
		get api_v1_experiences_url, as: :json
		resp = JSON.parse(response.body)
		
		assert_equal 2, resp.length
		(0...resp.length).each do |i|
			assert_equal resp[i]["id"], @experiences[i][:id]
		end

		assert_response :success
	end

	test "should create experience" do
		assert_difference('Experience.count') do
			post api_v1_experiences_url, params: {
				experience: {
					name: "Joe",
					title: "Door",
					start: DateTime.new,
					end: DateTime.new
				}
			}, as: :json
		end

		assert_response :created
	end

	test "should not create experience" do
		assert_no_difference('Experience.count') do
			post api_v1_experiences_url, params: {
				experience: {
					title: "Door",
					start: DateTime.new,
					end: DateTime.new
				}
			}, as: :json
		end

		assert_response :unprocessable_entity
	end

	test "should show experience" do
		get api_v1_experience_url(@experience_one), as: :json
		resp = JSON.parse(response.body)

		assert_equal resp["id"], @experience_one[:id]
		assert_response :success
	end

	test "should not show experience" do
		get api_v1_experience_url(-1), as: :json

		assert_response :not_found
	end

	test "should update project" do
		patch api_v1_experience_url(@experience_one), params: {
			experience: {
				name: "Joe",
				something: "else"
			}
		}, as: :json

		resp = JSON.parse(response.body)
		assert_nil resp["something"]
		assert_not_equal @experience_one[:name], resp["name"]
		assert_response :success
	end

	test "should not update project" do
		patch api_v1_experience_url(-1), params: {
			experience: {
				name: "Joe",
			}
		}, as: :json

		assert_response :not_found
	end

	test "should destroy experience" do
		assert_difference('Experience.count', -1) do
			delete api_v1_experience_url(@experience_one), as: :json
		end

		assert_response :no_content
	end

	test "should not destroy experience" do
		assert_no_difference('Experience.count') do
			delete api_v1_experience_url(-1), as: :json
		end

		assert_response :not_found
	end
end
