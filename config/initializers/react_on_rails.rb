ReactOnRails.configure do |config|
  # This configures the script to run to build the production assets by webpack. 
  config.build_production_command = "RAILS_ENV=production NODE_ENV=production bin/webpack"

  ################################################################################
  ################################################################################
  # TEST CONFIGURATION OPTIONS
  ################################################################################
  config.build_test_command = "RAILS_ENV=test bin/webpack"

  ################################################################################
  ################################################################################
  # SERVER RENDERING OPTIONS
  ################################################################################
  # This is the file used for server rendering of React when using `(prerender: true)`
  config.server_bundle_js_file = ""
end
