'use strict'

import { dynamoDb } from './dynamo'
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { GetItemCommand, GetItemInput } from '@aws-sdk/client-dynamodb'

export const get: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {

    const errors = validationErrors(event)
    if (errors) { throw errors }

    const namespaceAndFingerprint: string = [event.pathParameters?.namespace, event.pathParameters?.fingerprint].join('|');
    const params: GetItemInput = {
      TableName: process.env.DYNAMODB_TABLE as string,
      Key: {
        fingerprint: { S: namespaceAndFingerprint },
        key: { S: event.pathParameters?.key }
      }
    };

    const command = new GetItemCommand(params);
    const result = await dynamoDb.send(command);

    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(result.Item.value.S)
    };

    return response

  } catch (error) {
    const response: APIGatewayProxyResult = {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
    return response
  }
}

const validationErrors = (event: APIGatewayProxyEvent): Error => {
    if (typeof event.pathParameters?.fingerprint !== 'string'||
        typeof event.pathParameters.key !== 'string' ||
        typeof event.pathParameters.namespace !== 'string' ||
        event.pathParameters.fingerprint.length < 5 ||
        event.pathParameters.key.length < 1 ||
        event.pathParameters.namespace.length < 5) {
        console.log(event.pathParameters)
        return new Error('fingerprint(5), key(1) and namespace(5) are all required parameters with minimum lengths')
    }
    return null
}