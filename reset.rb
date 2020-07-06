#!/usr/bin/env ruby

require 'json'
require 'rest-client'
require 'open3'
require 'net/smtp'

environment = "production"
host = "api.justin-maldonado.com"

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
  puts "Error: Sending Website Email"
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

  message = <<END_MESSAGE
From: Justin Maldonado <just0422@gmail.com>
To: Justin Maldonado <just0422@hotmail.com>
Subject: Personal Website Error - Finished with status (#{status.exitstatus.to_s})

#{out}
#{err}
END_MESSAGE

  smtp = Net::SMTP.new 'smtp.gmail.com', 587
  smtp.enable_starttls

  smtp.start("smtp.gmail.com", "just0422@gmail.com", "mscovsqwbobxkvbe", :plain) 
  smtp.send_message message, "just0422@gmail.com", "just0422@gmail.com"
  smtp.finish()
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
  puts "Error: Sending Delta Email"
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

  message  = "From: Justin Maldonado <just0422@gmail.com>\n"
  message += "To: Justin Maldonado <just0422@gmail.com>\n"
  message += "MIME-Version: 1.0\n"
  message += "Content-type: text/html\n"
  message += "Subject: Delta Error - Finished with status (" + status.exitstatus.to_s + ")\n\n"
  message += out + err

  smtp = Net::SMTP.new 'smtp.gmail.com', 587
  smtp.enable_starttls

  smtp.start("smtp.gmail.com", "just0422@gmail.com", "mscovsqwbobxkvbe", :plain) 
  smtp.send_message message, "just0422@gmail.com", "just0422@gmail.com"
  smtp.finish()
else
  puts "DeltaLock Complete"
end

puts "\n\n\n"

begin
  puts "Entering Techarts"
  puts "------------------"
  Dir.chdir "/home/website/techarts"

  # Enter environment
  puts "Running command: 'source /home/website/techarts/techartsenv/bin/activate'"
  activate_env = "source /home/website/techarts/techartsenv/bin/activate"

  stdout, stderr, status = Open3.capture3(seed_database)
  throw :exitWithError if not status.success?
  puts "Successfully entered environment"

  # Seed DB
  seed_database = "/home/website/techarts/techartsenv/bin/python3 manage.py loaddata /home/website/techarts/seeds.json"
  puts "Running command: 'python3 manage.py loaddata'"

  stdout, stderr, status = Open3.capture3(seed_database)
  throw :exitWithError if not status.success?
  puts "Successfully seeded database"

rescue Exception => e
  puts "Error: Sending Tech Arts Email"
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

  message  = "From: Justin Maldonado <just0422@gmail.com>\n"
  message += "To: Justin Maldonado <just0422@gmail.com>\n"
  message += "MIME-Version: 1.0\n"
  message += "Content-type: text/html\n"
  message += "Subject: Tech Arts Error - Finished with status (" + status.exitstatus.to_s + ")\n\n"
  message += out + err

  smtp = Net::SMTP.new 'smtp.gmail.com', 587
  smtp.enable_starttls

  smtp.start("smtp.gmail.com", "just0422@gmail.com", "mscovsqwbobxkvbe", :plain) 
  smtp.send_message message, "just0422@gmail.com", "just0422@gmail.com"
  smtp.finish()
else
  puts "Tech Arts Checklist Complete"
end
