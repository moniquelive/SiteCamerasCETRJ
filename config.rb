###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

activate :neat

# No layout around my partials, please!
page "/partials/*", layout: false

# Build-specific configuration
configure :build do
  #activate :minify_html

  activate :gzip

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

  activate :asset_hash
end

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'www.camerasrj.com.br' # The name of the S3 bucket you are targetting. This is globally unique.
  s3_sync.region                     = 'us-east-1'     # The AWS region for your bucket.
  # set ENV vars:
  #  AWS_ACCESS_KEY_ID
  #  AWS_SECRET_ACCESS_KEY
  #s3_sync.aws_access_key_id          = 'AWS KEY ID'
  #s3_sync.aws_secret_access_key      = 'AWS SECRET KEY'
  s3_sync.delete                     = true
  s3_sync.after_build                = false # We chain after the build step by default. This may not be your desired behavior...
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = true

  ONE_YEAR = 60 * 60 * 24 * 365
  s3_sync.add_caching_policy 'text/html', max_age: 0, must_revalidate: true
  s3_sync.add_caching_policy 'application/gzip', max_age: 0, must_revalidate: true
  s3_sync.add_caching_policy 'application/javascript', max_age: ONE_YEAR
  s3_sync.add_caching_policy 'application/x-javascript', max_age: ONE_YEAR
  s3_sync.add_caching_policy 'text/javascript', max_age: ONE_YEAR
  s3_sync.add_caching_policy 'text/css', max_age: ONE_YEAR
  s3_sync.add_caching_policy 'image/png', max_age: ONE_YEAR
end

activate :cloudfront do |cf|
  cf.access_key_id = ENV['AWS_ACCESS_KEY_ID']
  cf.secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
  cf.distribution_id = 'E24VVIEBCKV6BF'
  cf.filter = /\.(html|html.gz)$/i
end

