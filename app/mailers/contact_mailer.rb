class ContactMailer < ApplicationMailer
	def contact_me
		@first_name = params[:first_name]
		@last_name = params[:last_name]
		@email = params[:email]
		@message = params[:message]
		
		mail(to: "just0422@gmail.com", from: "website@justin-maldonado.com", subject: "Message from " + @first_name + " " + @last_name) do |format|
			format.text
		end
	end
end
