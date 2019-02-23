Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
	namespace :api do
		namespace :v1 do
			resources :projects do
				resources :comments
				resources :skills
				resources :screenshots
			end
			resources :experiences do
				resources :comments
				resources :skills
			end

			resources :skills
		end
	end
end
