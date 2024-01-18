include .env

deploy:
	serverless deploy --aws-profile $(AWS_PROFILE) --stage $(STAGE)

remove:
	serverless remove --aws-profile $(AWS_PROFILE) --stage $(STAGE)

create_domain:
	serverless create_domain --aws-profile $(AWS_PROFILE) --stage $(STAGE)

delete_domain:
	serverless delete_domain --aws-profile $(AWS_PROFILE) --stage $(STAGE)

offline:
	serverless offline start
