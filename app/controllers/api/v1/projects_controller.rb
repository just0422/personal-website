class Api::V1::ProjectsController < ApplicationController
	before_action :set_project, only: [:show, :update, :destroy]

	# GET /projects
	def index
		@projects = Project.all.sort_by{ |project| project.rank }
		render json: @projects
	end

	# GET /projects/:id
	def show
		render json: @project
	end

	# POST /projects
	def create
		@project = Project.new(project_params)

		if @project.save
			render json: @project, status: :created, location: api_v1_project_url(@project)
		else
			render json: @project.errors, status: :unprocessable_entity
		end
	end

	# PUT /projects/:id
	def update
		if @project.update(project_params)
			render json: @project
		else
			render json: @project.errors, status: :unprocessable_entity
		end
	end

	# DELETE /projects/:id
	def destroy
		@project.destroy
	end

	private
	def set_project
		begin
			@project = Project.find(params[:id])
		rescue ActiveRecord::RecordNotFound
			render json: { message: "Project #{params[:id]} not found" }, status: :not_found
		end
	end

	def project_params
		params.require(:project).permit(:name, :description, :start, :end, :live_link, :demo_link, :github_link)
	end
end
