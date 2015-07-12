source 'https://rubygems.org'

gem "middleman"

# For faster file watcher updates on Windows:
gem "wdm", "~> 0.1.0", :platforms => [:mswin, :mingw]

# Cross-templating language block fix for Ruby 1.8
platforms :mri_18 do
  gem "ruby18_source_location"
end

gem 'therubyracer' # faster JS compiles
gem 'oj' # faster JS compiles

# visuals
gem 'bitters'

gem "json"

# twitter bootstrap
gem 'bootstrap-sass', require: false

# plugins
gem 'middleman-s3_sync'
gem 'middleman-cloudfront'
gem "middleman-minify-html"
gem "em-websocket", github: "igrigorik/em-websocket"

