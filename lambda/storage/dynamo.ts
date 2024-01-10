'use strict'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const IS_OFFLINE = process.env.IS_OFFLINE

let dynamoDb: DynamoDBClient
if (IS_OFFLINE === 'true') {
  dynamoDb = new DynamoDBClient({
    region: 'eu-central-1',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb)
} else {
  dynamoDb = new DynamoDBClient()
}

export { dynamoDb }
