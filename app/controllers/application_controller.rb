class ApplicationController < ActionController::API
	# RESET the website data
	def reset
		if system("ruby ~/personal-website/reset.rb")
			render json: {}, status: :ok
		else
			render json: {}, status: :internal_server_error
		end
	end
end
