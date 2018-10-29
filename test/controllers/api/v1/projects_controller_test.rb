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

		assert_response :created
	end

	test "should not create project" do
		assert_no_difference('Project.count') do
			post api_v1_projects_url, params: { 
				project: {
					description: "JoeText",
					start: DateTime.new,
					end: DateTime.new,
					demo_link: "link",
					github_link: "link"
				}
			}, as: :json
		end

		assert_response :unprocessable_entity
	end

	test "should show project" do
		get api_v1_project_url(@project_one), as: :json
		resp = JSON.parse(response.body)

		assert_equal resp["id"], @project_one[:id]
		assert_response :success
	end

	test "should not show project" do
		get api_v1_project_url(-1), as: :json
		assert_response :not_found
	end

	test "should update project" do
		patch api_v1_project_url(@project_one), params: { 
			project: {
				name: "Joes",
				something: "else"
			} 
		}, as: :json
		
		resp = JSON.parse(response.body)
		assert_nil resp["something"]
		assert_not_equal @project_one[:name], resp["name"]
		assert_response :success
	end

	test "should not update project" do
		patch api_v1_project_url(-1), params: { 
			project: {
				name: "Joes"
			} 
		}, as: :json

		assert_response :not_found
	end
		
	test "should destroy project" do
		assert_difference('Project.count', -1) do
			delete api_v1_project_url(@project_one), as: :json
		end

		assert_response :no_content
	end

	test "should not destroy project" do
		assert_no_difference('Project.count') do
			delete api_v1_project_url(-1), as: :json
		end

		assert_response :not_found
	end
end
