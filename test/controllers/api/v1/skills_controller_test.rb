require 'test_helper'

class SkillsControllerTest < ActionDispatch::IntegrationTest
	setup do
		@skill_one = skills(:one)
		@skill_two = skills(:two)
		@skill_five = skills(:five)

		@project = projects(:one)
		@project_skills = [skills(:two), skills(:four), skills(:five)]

		@experience = experiences(:one)
		@experience_skills = [skills(:one), skills(:three), skills(:five)]
	end

	def get_test(url, skills)
		get url, as: :json
		resp = JSON.parse(response.body)

		assert_equal skills.length, resp.length
		(0...resp.length).each do |i|
			assert comments.any?{ |comment| resp[i]["id"] == comment[:id] }
		end

		assert_response :success
	end

	test "should get index" do
		# Get Experience Skills
		get_test(api_v1_experience_skills_url(@experience), @experience_skills)

		# Get Project Comments
		get_test(api_v1_project_skills_url(@project), @project_skills)

		# Get all comments
		get api_v1_skills_url, as: :json
		resp = JSON.parse(response.body)
		assert_equal 5, resp.length
		assert_response :success
	end

	def create_test(count, url)
		assert_difference('Skill.count') do
			assert_difference(count) do
				post url, params: {
					skill: {
						name: "abc",
						years: 1
					}
				}, as: :json
			end
		end

		assert_response :created
	end
		
	test "should create skill" do
		# Create Experience Skill
		create_test("Experience.find(#{@experience[:id]}).skills.count", api_v1_experience_skills_url(@experience))

		# Create Project Skill
		create_test("Project.find(#{@project[:id]}).skills.count", api_v1_project_skills_url(@project))

		# Creat Skill
		assert_difference('Skill.count') do
			post api_v1_skills_url, params: {
				skill: {
					name: "abc",
					years: 1
				}
			}, as: :json
		end
	end

	def create_fail_test(url)
		assert_no_difference('Comment.count') do
			post url, params: {
				skill: {
					something: "else"
				}
			}, as: :json
		end
	end

	test "should not create skill" do
		# Attempt to Create Experience Skill
		create_fail_test(api_v1_experience_skills_url(@experience))

		# Attempt to create project skill
		create_fail_test(api_v1_project_skills_url(@project))

		# Attempt to create skill
		create_fail_test(api_v1_skills_url)
	end

	def show_test(url)
		get url, as: :json
		resp = JSON.parse(response.body)

		assert_equal resp["id"], @skill_five[:id]
		assert_response :success
	end

	test "should show skill" do
		# Show Experience Skill
		show_test(api_v1_experience_skill_url(@experience, @skill_five))

		# Show Project Skill
		show_test(api_v1_project_skill_url(@project, @skill_five))

		# Show skill
		show_test(api_v1_skill_url(@skill_five))
	end

	test "should not show skill" do
		# Attempt to Show Experience Skill
		get api_v1_experience_skill_url(@experience, -1)
		assert_response :not_found

		# Attempt to Show Project Skill
		get api_v1_project_skill_url(@project, -1)
		assert_response :not_found

		# Attempt to Show skill
		get api_v1_skill_url(-1)
		assert_response :not_found
	end

	def update_test(url, skill)
		patch url, params: {
			skill: {
				name: "#{skill[:name]}_1",
				something: "else"
			}
		}, as: :json
		
		resp = JSON.parse(response.body)
		assert_nil resp["something"]
		assert_not_equal "#{skill[:name]}", resp["name"]
		assert_response :success
	end

	test "should update skill" do
		# Update Experience skill
		update_test(api_v1_experience_skill_url(@experience, @skill_one), @skill_one)

		# Update Project skill
		update_test(api_v1_project_skill_url(@project, @skill_one), @skill_one)

		# Update skill
		update_test(api_v1_skill_url(@skill_one), @skill_one)
	end

	def update_fail_test(url)
		patch url, params: {
			comment: {
				name: "name"
			}
		}, as: :json

		assert_response :not_found
	end

	test "should not update skill" do
		# Attempt to update experience skill
		update_fail_test(api_v1_experience_comment_url(@experience, -1))

		# Attempt to update project skill
		update_fail_test(api_v1_project_skill_url(@project, -1))

		# Attempt to update skill
		update_fail_test(api_v1_skill_url(-1))
	end

	def destroy_test(count, url)
		assert_difference('Skill.count', -1) do
			assert_difference(count, -1) do
				delete url, as: :json
			end
		end

		assert_response :no_content
	end

	test "should destroy skill" do
		# Destroy Experience skill
		destroy_test("Experience.find(#{@experience[:id]}).skills.count", api_v1_experience_skill_url(@experience, @skill_one))

		# Destroy Project skill
		destroy_test("Project.find(#{@project[:id]}).skills.count", api_v1_project_skill_url(@project, @skill_two))

		destroy_test("Skill.count", api_v1_skill_url(@skill_five))
	end

	def destroy_fail_test(url)
		assert_no_difference('Skill.count') do
			delete url, as: :json
		end

		assert_response :not_found
	end
	
	test "should not destroy skill" do
		# Attempt to destroy non-existent experience skill
		destroy_fail_test(api_v1_experience_skill_url(@experience, -1))

		# Attempt to destroy non-existent project skill
		destroy_fail_test(api_v1_project_skill_url(@project, -1))

		# Attempt to destroy non-existent skill
		destroy_fail_test(api_v1_skill_url(-1))
	end
end
