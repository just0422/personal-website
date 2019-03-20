#!/usr/bin/env ruby

require 'json'
require 'optparse'
require 'rest-client'

environment = "production"
host = "localhost"

puts "Seeding " + environment + " Database"

seed_database = "RAILS_ENV=" + environment + " rails db:seed"
puts "Running command: '" + seed_database + "'"

system(seed_database)

base_url="http://" + host + "/api/v1/projects"
puts "Getting projects from " + base_url
projects = JSON.parse(RestClient.get(base_url))

projects.each do |project|
	project_found = " not "
	if Dir.entries('screenshots').include? project["name"] 
		project_found = " "
	end

	puts project["name"] + project_found + "found"
	if Dir.entries('screenshots').include? project["name"]
		url = base_url + "/" + project["id"].to_s + '/screenshots'
		
		images = Dir['screenshots/' + project["name"] + '/*']
		puts "Found " + images.length.to_s + " images in 'screenshots/" + project["name"] + "/*'"
		images.each do |image|
			image_data = {
				'screenshot': {
					'title': image.split('/')[2],
					'image': File.new(image)
				}
			}
		
			puts "POSTing '" + image.split('/')[2] + "' to " + url
			RestClient.post(url, image_data)
		end
	end
end
