class Api::V1::SkillsController < ApplicationController
	before_action :pick_parent
	before_action :set_skill, only: [:show, :update, :destroy]

	# GET /skills
	# GET /projects/:project_id/skills
	# GET /experiences/:experience_id/skills
	def index
		if @parent_category.nil?
			@skills = Skill.all
		else
			@skills = @parent.skills
		end

		render json: @skills
	end

	# GET /skills/:id
	# GET /projects/:project_id/skills/:id
	# GET /experiences/:experience_id/skills/:id
	def show
		render json: @skill
	end

	# POST /skills
	# POST /projects/:project_id/skills
	# POST /experiences/:experience_id/skills
	def create
		@skill = Skill.new(skill_params)

		unless @parent_category.nil?
			@skill = @parent.skills.build(skill_params)

			unless @parent.save
				render json: @parent.errors, status: :unprocessable_entity
				return
			end
		end

		if @skill.save
			render json: @skill, status: :created
		else
			render json: @skill.errors, status: :unprocessable_entity
		end
	end

	# PATCH /skills/:id
	# PATCH /projects/:project_id/skills/:id
	# PATCH /experiences/:experience_id/skills/:id
	def update
		if @skill.update(skill_params)
			render json: @skill, status: :ok
		else
			render json: @skill.errors, status: :unprocessable_entity
		end
	end

	# DELETE /skills/1
	# DELETE /skills/1.json
	def destroy
		@skill.destroy
	end

	private
	# Use callbacks to share common setup or constraints between actions.
	def set_skill
		begin
			@skill = Skill.find(params[:id])
		rescue ActiveRecord::RecordNotFound
			render json: { message: "Skill #{params[:id]} not found" }, status: :not_found
		end
	end

	def pick_parent
		if params.key?(:experience_id)
			@parent_category = "experience"
		elsif params.key?(:project_id)
			@parent_category = "project"
		end

		unless @parent_category.nil?
			@parent_model = @parent_category.capitalize.constantize
			@parent_symbol = @parent_category.pluralize.to_sym
			@parent_id = params["#{@parent_category}_id".to_sym]
			@parent = @parent_model.find(@parent_id)
		end
	end

	# Never trust parameters from the scary internet, only allow the white list through.
	def skill_params
		params.require(:skill).permit(:name, :years)
	end
end
