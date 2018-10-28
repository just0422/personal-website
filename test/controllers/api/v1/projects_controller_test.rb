require 'test_helper'

class ProjectsControllerTest < ActionDispatch::IntegrationTest
	setup do
		@projects = [projects(:one), projects(:two)]
		@project_one = projects(:one)
	end

	test "should get index" do
		get api_v1_projects_url, as: :json
		resp = JSON.parse(response.body)

		assert_equal 2, resp.length
		(0...resp.length).each do |i|
			assert_equal resp[i]["id"], @projects[i][:id]
		end

		assert_response :success
	end

	test "should create project" do
		assert_difference('Project.count') do
			post api_v1_projects_url, params: { 
				project: {
					name: "Joe",
					description: "JoeText",
					start: DateTime.new,
					end: DateTime.new,
					demo_link: "link",
					github_link: "link"
				} 
			}, as: :json
		end

		assert_response 201
	end

	test "should show project" do
		get api_v1_project_url(@project_one), as: :json
		assert_response :success
	end

	test "should update project" do
		patch api_v1_project_url(@project_one), params: { 
			project: {
				name: "Joes"
			} 
		}, as: :json
		
		resp = JSON.parse(response.body)
		puts(resp)
		puts(@project_one.to_json)
		assert_not_equal @project_one[:name], resp["name"]
		assert_response 200
	end

	test "should destroy project" do
		assert_difference('Project.count', -1) do
			delete api_v1_project_url(@project_one), as: :json
		end

		assert_response 204
	end
end
