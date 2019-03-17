#!/usr/bin/env ruby

require 'json'
require 'optparse'
require 'rest_client'

options = {}
optparse = OptionParser.new do|opts|
	options[:environment] = "development"
	opts.on('-e', '--environment', 'Rails environment to send data to') do |env|
		options[:environment] = env
	end

	options[:host] = "localhost"
	opts.on('-a', '--host', 'Server hostname') do |host|
		options[:host] = host
	end

	options[:port] = 3001
	opts.on('p', '--port', 'Server port') do |port|
		options[:port] = port
	end
end
optparse.parse!

puts "Seeding " + options[:environment] + " Database"

seed_database = "rails db:seed"
puts "Running command: '" + seed_database + "'"

system(seed_database)

base_url="http://" + options[:host] + ":" + options[:port].to_s + "/api/v1/projects"
puts "Getting projects from " + base_url
projects = JSON.parse(RestClient.get(base_url))

projects.each do |project|
	if Dir.entries('screenshots').include? project["name"]
		url = base_url + "/" + project["id"].to_s + '/screenshots'

		images = Dir['screenshots/' + project["name"] + '/*']
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
