class Api::V1::CommentsController < ApplicationController
	before_action :pick_parent
	before_action :set_comment, only: [:show, :update, :destroy]

	# GET /projects/:project_id/comments
	# GET /experiences/:experience_id/comments
	def index
		@comments = Comment.where("#{@parent_category}_id = #{@parent_id}")
		render json: @comments
	end

	# GET /projects/:project_id/comments/:id
	# GET /experiences/:experience_id/comments/:id
	def show
		render json: @comment
	end

	# POST /projects/:project_id/comments
	# POST /experiences/:experience_id/comments
	def create
		@comment = Comment.new(comment_params)

		@parent = @parent_model.find(@parent_id)
		@parent.comments << @comment
		if not @parent.save
			render json: @parent.errors, status: :unprocessable_entity
		end

		if @comment.save
			render json: @comment, status: :created
		else
			render json: @comment.errors, status: :unprocessable_entity
		end
	end

	# PATCH /projects/:project_id/comments/:id
	# PATCH /experiences/:experience_id/comments/:id
	def update
		if @comment.update(comment_params)
			render json: @comment, status: :ok
		else
			render json: @comment.errors, status: :unprocessable_entity
		end
	end

	# DELETE /comments/1
	# DELETE /comments/1.json
	def destroy
		@parent = @parent_model.find(@parent_id)
		@parent.comments.delete(@comment)

		@comment.destroy
	end

	private
	def pick_parent
		if params.key?(:experience_id)
			@parent_model = Experience
			@parent_category = "experience"
			@parent_id = params[:experience_id]
		else
			@parent_model = Project
			@parent_category = "project"
			@parent_id = params[:project_id]
		end
	end

	# Use callbacks to share common setup or constraints between actions.
	def set_comment
		begin
			@comment = Comment.find(params[:id])
		rescue ActiveRecord::RecordNotFound
			render json: { message: "Comment #{params[:id]} not found" }, status: :not_found
		end
	end

	# Never trust parameters from the scary internet, only allow the white list through.
	def comment_params
		params.require(:comment).permit(:content)
	end
end
