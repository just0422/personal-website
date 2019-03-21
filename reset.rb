#!/usr/bin/env ruby

require 'json'
require 'rest-client'
require 'open3'
require 'mail'

environment = "production"
host = "api.justin-maldonado.com"

Mail.defaults do
  delivery_method :smtp, { 
    :address => "smtp.mailgun.org", 
    :port => 587, 
    :domain => "sandboxc650c29850bf4bc5801a651b4f5f5f1c.mailgun.org",
    :user_name => "postmaster@sandboxc650c29850bf4bc5801a651b4f5f5f1c.mailgun.org",
    :password => "b90b739bc5a2252625392fa4b4aebfab-985b58f4-94f3d2e3",
    :authentication => 'plain',
    :enable_starttls_auto => true
  }
end

begin 
  puts "Entering Personal Website"
  puts "-------------------------"
  Dir.chdir "/home/website/personal-website"

  puts "Seeding " + environment + " Database"

  seed_database = "RAILS_ENV=" + environment + " rails db:seed"
  puts "Running command: '" + seed_database + "'"

  stdout, stderr, status = Open3.capture3(seed_database)
  throw :exitWithError if not status.success?

  puts "Successfully seeded database"

  base_url="http://" + host + "/api/v1/projects"
  puts "Getting projects from " + base_url
  projects = JSON.parse(RestClient.get(base_url))

  projects.each do |project|
    project_found = "- NOT "
    if Dir.entries('screenshots').include? project["name"] 
      project_found = "- "
    end

    puts project_found + "FOUND - " + project["name"]
    if Dir.entries('screenshots').include? project["name"]
      url = base_url + "/" + project["id"].to_s + '/screenshots'
      
      images = Dir['screenshots/' + project["name"] + '/*']
      puts "--- Found " + images.length.to_s + " images in 'screenshots/" + project["name"] + "/*'"
      images.each do |image|
        image_data = {
          'screenshot': {
            'title': image.split('/')[2],
            'image': File.new(image)
          }
        }
      
        puts "--- POSTing '" + image.split('/')[2] + "' to " + url
        RestClient.post(url, image_data)
      end
    end
  end
rescue Exception => e
  puts "Error: Sending Email"
  out = "------------------------------------------------------------------\n"
  out +="|                            STDOUT                              |\n"
  out +="------------------------------------------------------------------\n"
  out += stdout

  out +="\n\n==================================================================\n\n"

  err = "------------------------------------------------------------------\n"
  err +="|                            STDERR                              |\n"
  err +="------------------------------------------------------------------\n"
  err += stderr
  err +="------------------------------------------------------------------\n"
  err += e.message
  err +="------------------------------------------------------------------\n"
  err += e.backtrace.inspect

  Mail.deliver do
    to "just0422@gmail.com"
    from "website@justin-maldonado.com"
    subject "Personal Website Error - Finished with status (" + status.exitstatus.to_s + ")"
    body out + err
  end
else
  puts "Personal Website Complete"
end

puts "\n\n\n"

begin
  puts "Entering DeltaLock"
  puts "------------------"
  Dir.chdir "/home/website/DeltaLock"

  seed_database = "RAILS_ENV=" + environment + " rails db:seed"
  puts "Running command: '" + seed_database + "'"

  stdout, stderr, status = Open3.capture3(seed_database)
  throw :exitWithError if not status.success?
  puts "Successfully seeded database"

rescue Exception => e
  puts "Error: Sending Email"
  out = "------------------------------------------------------------------\n"
  out +="|                            STDOUT                              |\n"
  out +="------------------------------------------------------------------\n"
  out += stdout

  out +="\n\n==================================================================\n\n"

  err = "------------------------------------------------------------------\n"
  err +="|                            STDERR                              |\n"
  err +="------------------------------------------------------------------\n"
  err += stderr
  err +="------------------------------------------------------------------\n"
  err += e.message
  err +="------------------------------------------------------------------\n"
  err += e.backtrace.inspect

  Mail.deliver do
    to "just0422@gmail.com"
    from "website@justin-maldonado.com"
    subject "Personal Website Error - Finished with status (" + status.exitstatus.to_s + ")"
    body out + err
  end
else
  puts "DeltaLock Complete"
end

puts "\n\n\n"
