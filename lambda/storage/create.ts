import { APIGatewayProxyEvent, Context, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { dynamoDb } from './dynamo'
import { PutItemCommand, PutItemInput } from '@aws-sdk/client-dynamodb'
import { createValidationErrors } from './validation'
import { getHeaders } from './headers'

export interface eventBodyInterface {
  fingerprint: string,
  key: string,
  namespace: string,
  value: string
}

export  const  create : APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const headers = getHeaders(event)
  const errors = createValidationErrors(event)
  const data: eventBodyInterface = JSON.parse(event.body || '{}');

  // If there are validation errors, just throw them
  if (errors) {
    throw errors
  }

  // If the origin is not allowed, return 403
  if (!headers.hasOwnProperty('Access-Control-Allow-Origin'))
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Origin not allowed: ' + " " + event.headers.origin }),
      headers: headers
    }

  // The actual logic
  try  {
    const { fingerprint, key, namespace, value } = data;
    const namespaceAndFingerprint = [namespace, fingerprint].join('|')
    const expiresAt = Math.floor(new Date().getTime() / 1000) + 24 * 3600
  
    const params: PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE as string,
      Item: {
        fingerprint: { S: namespaceAndFingerprint },
        key: { S: key },
        value: { S: value },
        expiresAt: { N: expiresAt.toString() }
      }
    }
  
    const result = await dynamoDb.send(new PutItemCommand(params));
    // create a response
    const response: APIGatewayProxyResult = {
      statusCode: result.$metadata.httpStatusCode || 200,
      body: JSON.stringify(result),
      headers: headers
    }

    return response
    
  } catch (error) {
    
    // If we threw errors, return internal server error
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
      headers: headers
    }
  }
}