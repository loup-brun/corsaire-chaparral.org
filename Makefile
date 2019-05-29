.PHONY: build

help:
	@echo "Usage: make <command>"
	@echo "  serve  Runs a development webserver on port 1313"
	@echo "  build   Build the site with minification"
	@echo "  build-staging   Build the site with *staging* configuration"

serve:
	hugo serve --disableFastRender --config=config.yml,config.staging.yml

build:
	hugo '--minify'

build-staging:
	hugo --config=config.yml,config.staging.yml --minify

all:
	make build && ./deploy-production
