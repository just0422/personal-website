class Api::V1::ScreenshotsController < ApplicationController
	before_action :pick_parent
	before_action :set_screenshot, only: [:show, :update, :destroy]

	# GET /projects/:project_id/screenshots
	def index
		render json: @parent.screenshots
	end

	# GET /projects/:project_id/screenshots/:id
	def show
		render json: @screenshot
	end

	# POST /projects/:project_id/screenshots
	def create
		@screenshot = @parent.screenshots.build(screenshot_params)
		unless @parent.save
			render json: @parent.errors, status: :unprocessable_entity
			return
		end

		if @screenshot.save
			render json: @screenshot, status: :created
		else
			render json: @screenshot.errors, status: :unprocessable_entity
		end
	end

	# PATCH /projects/:project_id/screenshots/:id
	def update
		if @screenshot.update(screenshot_params)
			render json: @screenshot, status: :ok
		else
			render json: @screenshot.errors, status: :unprocessable_entity
		end
	end

	# DELETE /projects/:project_id/screenshots/:id
	def destroy
		@parent.screenshots.delete(@screenshot)

		@screenshot.destroy
	end

	private
	def pick_parent
		if params.key?(:experience_id)
			@parent_category = "experience"
		else
			@parent_category = "project"
		end

		@parent_model = @parent_category.capitalize.constantize
		@parent_id = params["#{@parent_category}_id".to_sym]
		@parent = @parent_model.find(@parent_id)
	end

	# Use callbacks to share common setup or constraints between actions.
	def set_screenshot
		begin
			@screenshot = Screenshot.find(params[:id])
		rescue ActiveRecord::RecordNotFound
			render json: { message: "screenshot #{params[:id]} not found" }, status: :not_found
		end
	end

	# Never trust parameters from the scary internet, only allow the white list through.
	def screenshot_params
		params.require(:screenshot).permit(:title, :image_data)
	end
end
