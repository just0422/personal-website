class Api::V1::ContactController < ApplicationController
	# Create email
	def create
		if ContactMailer.with(contact_params).contact_me.deliver_now
			render json: { message: "Successfully delivered" }, status: :ok
		else
			render json: { message: "Unable to deliver" }, status: :internal_server_error
		end
	end

	private
	def contact_params
		params.require(:contact).permit(:first_name, :last_name, :email, :message)
	end
end
