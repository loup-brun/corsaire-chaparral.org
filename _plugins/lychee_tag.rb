# Connects Jekyll with Lychee (http://lychee.electerious.com/)
#
# # Features
#
# * Generate album overview and link to image
# * Caching of JSON data
#
# # Usage
#
#   {% lychee_album <album_id> %}
#   {% lychee_album_no_cache <album_id> %}
#
# # Example
#
#   {% lychee_album 1 %}
#   {% lychee_album_no_cache 1 %}
#
# # Default configuration (override in _config.yml)
#
#   lychee:
#     url: http://electerious.com/lychee_demo
#     album_title_tag: h1
#     link_big_to: lychee
#     cache_folder: _lychee_cache
#
# Change at least "url" to your own Lychee installation
# album_title_tag: let's you chose which HTML tag to use around the album title
# link_big_to: choose "lychee" or "img".
#   lychee: links the image to the Lychee image view
#   img: links the image to it's original image
#
# # Author and license
#
# Tobias Brunner <tobias@tobru.ch> - https://tobrunet.ch
# License: MIT

require 'json'
require 'net/http'
require 'net/https'
require 'uri'

module Jekyll
	class LycheeAlbumTag < Liquid::Tag
		# Added truncatewords filter
		def truncatewords(input, words = 15, truncate_string = "...")
			if input.nil? then return end
			wordlist = input.to_s.split
			l = words.to_i - 1
			l = 0 if l < 0
			wordlist.length > l ? wordlist[0..l].join(" ") + truncate_string : input
		end
		def initialize(tag_name, config, token)
			super

			# params coming from the liquid tag
			@params = config.strip

			# get config from _config.yml
			@config = Jekyll.configuration({})['lychee'] || {}
			# set default values
			@config['album_title_tag'] ||= 'h1'
			@config['link_big_to']     ||= 'lychee'
			@config['url']             ||= 'http://electerious.com/lychee_demo'
			@config['cache_folder']    ||= '_lychee_cache'

			# construct class wide usable variables
			@thumb_url = @config['url'] + "/uploads/thumb/"
			@big_url = @config['url'] + "/uploads/big/"
			@album_id = @params

			# initialize caching
			@cache_disabled = false
			@cache_folder = File.expand_path "../#{@config['cache_folder']}", File.dirname(__FILE__)
		FileUtils.mkdir_p @cache_folder

	end

	def render(context)
		# initialize session with Lychee
		api_url = @config['url'] + "/php/api.php"
		uri = URI.parse(api_url)
		@http = Net::HTTP.new(uri.host, uri.port)
		@http.use_ssl = false #set to false because jekyll was throwing an error for a non-https host
		@request = Net::HTTP::Post.new(uri.request_uri)
		@request['Cookie'] = init_lychee_session

		album = cached_response(@album_id, 'album') || get_album(@album_id)
		puts "[Lychee Tag] Processing Lychee album id #{@album_id}: '#{album['title']}'"
	html = ""
	album_content = album['content']
	album_content.each do |photo_id, photo_data|
		# retrieve photo information with the get_photo() function
		photo = get_photo(@album_id, photo_id)

		title = photo['title']
		caption = photo['description']
		short_caption = truncatewords(caption, 12)
		url = @config['url'] + photo['url']
		thumbUrl = @config['url'] + photo['thumbUrl']
		tag = photo['tags']

		html << "<figure class=\"figure-float col col-4 tablet-col-6 mobile-col-12\">\n<img class=\"blazy\" src=\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\" data-src-sm=\"#{thumbUrl}\" data-src=\"#{url}\" data-title=\"#{title}\" data-caption=\"#{caption}\" alt=\"#{title}\" data-meta=\"#{tag}\" />\n<figcaption>\n<h5>#{title}</h5>\n<p>#{short_caption}</p>\n</figcaption>\n</figure>\n"
	end

	return html
end

# Caching
def cache(id, type, data)
	puts "[Lychee Tag] Caching Lychee #{type} id #{id}"
	cache_file = cache_file_for(id, type)
	File.open(cache_file, "w") do |f|
		f.write(data)
	end
end

def cache_file_for(id, type)
	filename = "#{type}_#{id}"
	File.join(@cache_folder, filename)
end

def cached_response(id, type)
	return nil if @cache_disabled
	cache_file = cache_file_for(id, type)
	JSON.parse(File.read(cache_file)) if File.exist?(cache_file)
end


# Lychee API mapping
def init_lychee_session
	# construct request
	@request.set_form_data({'function' => 'init'})
	# send request now and save cookies
	response = @http.request(@request)
	return response.response['set-cookie']
end
def get_albums
	@request.set_form_data({'function' => 'getAlbums'})
	return JSON.parse(@http.request(@request).body)
end
def get_album(id)
	@request.set_form_data({'function' => 'getAlbum', 'albumID' => id, 'password' => ''})
	response = @http.request(@request).body
	cache(id, 'album', response) unless @cache_disabled
	return JSON.parse(response)
end
def get_photo(album_id, photo_id)
	@request.set_form_data({'function' => 'getPhoto', 'albumID' => album_id, 'photoID' => photo_id, 'password' => ''})
	response = @http.request(@request).body
	cache(photo_id, 'photo', response) unless @cache_disabled
	return JSON.parse(response)
end
end

class LycheeAlbumTagNoCache < LycheeAlbumTag
	def initialize(tag_name, config, token)
		super
		@cache_disabled = true
	end
end
end

Liquid::Template.register_tag('lychee_album', Jekyll::LycheeAlbumTag)
Liquid::Template.register_tag('lychee_album_no_cache', Jekyll::LycheeAlbumTagNoCache)
