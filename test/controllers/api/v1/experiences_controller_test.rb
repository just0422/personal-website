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

		assert_response 201
	end

	test "should show experience" do
		get api_v1_experience_url(@experience_one), as: :json
		assert_response :success
	end

	test "should update project" do
		patch api_v1_experience_url(@experience_one), params: {
			experience: {
				name: "Joe"
			}
		}, as: :json

		resp = JSON.parse(response.body)
		assert_not_equal @experience_one[:name], resp["name"]
		assert_response 200
	end

	test "should destroy experience" do
		assert_difference('Experience.count', -1) do
			delete api_v1_experience_url(@experience_one), as: :json
		end

		assert_response 204
	end
end
