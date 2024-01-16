include .env
VERSION := $(shell jq -r '.version' package.json)

publish:
	aws s3 cp ./build/ThumbmarkStore.js $(CDN_BUCKET)/thumbmark/$(VERSION)/ThumbmarkStore.js --profile $(AWS_PROFILE)

latest:
	make publish
	aws s3 cp ./build/ThumbmarkStore.js $(CDN_BUCKET)/thumbmark/latest/ThumbmarkStore.js --profile $(AWS_PROFILE)

invalidate:
	aws cloudfront create-invalidation --distribution-id $(CDN_DISTRIBUTION) --paths "/latest/ThumbmarkStore.js" --profile $(AWS_PROFILE)