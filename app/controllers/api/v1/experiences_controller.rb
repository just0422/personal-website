class Api::V1::ExperiencesController < ApplicationController
	before_action :set_experience, only: [:show, :update, :destroy]

	# GET /experiences
	def index
		@experiences = Experience.all
		render json: @experiences
	end

	# GET /experiences/:id
	def show
		render json: @experience
	end

	# POST /experiences
	def create
		@experience = Experience.new(experience_params)

		if @experience.save
			render json: @experience, status: :created, location: api_v1_experience_url(@experience)
		else
			render json: @experience.errors, status: :unprocessable_entity
		end
	end

	# PUT /experiences/:id
	def update
		if @experience.update(experience_params)
			render json: @experience
		else
			render json: @experience.errors, status: :unprocessable_entity
		end
	end

	# DELETE /experiences/:id
	def destroy
		@experience.destroy
	end

	private
	def set_experience
		begin
			@experience = Experience.find(params[:id])
		rescue ActiveRecord::RecordNotFound
			render json: { message: "Experience #{params[:id]} not found" }, status: :not_found
		end
	end

	def experience_params
		params.require(:experience).permit(:name, :title, :start, :end)
	end
end
