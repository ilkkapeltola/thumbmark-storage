include .env

deploy:
	serverless deploy --aws-profile $(AWS_PROFILE) --stage prod

remove:
	serverless remove --aws-profile $(AWS_PROFILE) --stage prod

offline:
	serverless offline start
