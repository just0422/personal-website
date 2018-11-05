Rails.application.routes.draw do
	namespace :api do
		namespace :v1 do
			resources :projects do
				resources :comments
				resources :skills
			end
			resources :experiences do
				resources :comments
				resources :skills
			end

			resources :skills
		end
	end
end
