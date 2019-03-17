source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.3.1'

gem 'rails', '~> 5.2.1'					# rails bundle
gem 'pg', '>= 0.18', '< 2.0'		# postgresql
gem 'puma', '~> 3.11'						# puma app server
gem 'sass-rails', '~> 5.0'			# Scss for stylesheets
gem 'uglifier', '>= 1.3.0'			# compresses javascript

gem 'rails_admin', '~> 1.3'			# admin

gem 'turbolinks', '~> 5'				# turbolinks 
gem 'jbuilder', '~> 2.5'				# Build JSON's (for API

gem "shrine"										# Image uploading
gem "image_processing"
gem "mini_magick", ">= 4.3.5"
gem "rest-client"

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

gem "sprig"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'rb-readline'
end

group :test do
  gem 'capybara', '>= 2.15'			# Capybara testing
  gem 'selenium-webdriver'			# Selenium testing
  gem 'chromedriver-helper'			# Chrome testing
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
