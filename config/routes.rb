Rails.application.routes.draw do
	namespace :api do
		namespace :v1 do
			resources :projects do
				resources :comments
			end
			resources :experiences do
				resources :comments
			end
		end
	end
end
