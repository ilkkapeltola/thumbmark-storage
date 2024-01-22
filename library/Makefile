include .env
VERSION := $(shell jq -r '.version' package.json)

publish:
	aws s3 cp ./build/ThumbmarkStorage.js $(CDN_BUCKET)/thumbmark/$(VERSION)/ThumbmarkStorage.js --profile $(AWS_PROFILE)

latest:
	make publish
	aws s3 cp ./build/ThumbmarkStorage.js $(CDN_BUCKET)/thumbmark/latest/ThumbmarkStorage.js --profile $(AWS_PROFILE)

invalidate:
	aws cloudfront create-invalidation --distribution-id $(CDN_DISTRIBUTION) --paths "/latest/ThumbmarkStorage.js" --profile $(AWS_PROFILE)