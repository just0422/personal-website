class Api::V1::CommentsController < ApplicationController
	before_action :pick_parent
	before_action :set_comment, only: [:show, :update, :destroy]

	# GET /projects/:project_id/comments
	# GET /experiences/:experience_id/comments
	def index
		render json: @parent.comments
	end

	# GET /projects/:project_id/comments/:id
	# GET /experiences/:experience_id/comments/:id
	def show
		render json: @comment
	end

	# POST /projects/:project_id/comments
	# POST /experiences/:experience_id/comments
	def create
		#@comment = Comment.new(comment_params)

		#@parent.comments << @comment
		
		@comment = @parent.comments.build(comment_params)
		unless @parent.save
			render json: @parent.errors, status: :unprocessable_entity
			return
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
		@parent.comments.delete(@comment)

		@comment.destroy
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
