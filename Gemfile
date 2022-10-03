# frozen_string_literal: true
#gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
gem "jekyll-theme-chirpy"

source "https://rubygems.org"

gemspec

group :test do
  gem "html-proofer", "~> 3.18"
end

# group :jekyll_plugins do
#   gem "jekyll-feed", "~> 0.12"
#   gem "jekyll-paginate"
#   gem "jekyll-sitemap"
#   gem "jekyll-gist"
#   gem "html-proofer", "~> 3.18"
#   gem "jekyll-include-cache"
# end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

# Jekyll <= 4.2.0 compatibility with Ruby 3.0
gem "webrick", "~> 1.7"
