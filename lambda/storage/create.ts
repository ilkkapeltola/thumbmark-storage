import { APIGatewayProxyEvent, Context, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { dynamoDb } from './dynamo'
import { PutItemCommand, PutItemInput } from '@aws-sdk/client-dynamodb'

interface eventBodyInterface {
  fingerprint: string,
  key: string,
  namespace: string,
  value: string
}

export  const  create : APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try  {
    const data: eventBodyInterface = JSON.parse(event.body || '{}');
    const errors = validationErrors(data)
    if (errors) {
      throw errors
    }

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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow_headers': true,
        'Content-type': 'application/json'
      }
    }

    console.log(params)

    return response
    
  } catch (error) {
    console.error(error)
    //throw new Error('Couldn\'t create the todo item.')
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow_headers': true,
        'Content-type': 'application/json'
      }
    }
  }
}

const validationErrors = (data: eventBodyInterface): Error | null => {
  const { fingerprint, key, namespace, value } = data;
  const errors: string[] = [];
  
  if (typeof fingerprint !== 'string' || typeof key !== 'string' || typeof namespace !== 'string' || typeof value !== 'string') {
    errors.push('fingerprint, key, namespace, and value are all required parameters and need to be strings')
  }

  if (fingerprint.length < 5 || key.length < 1 || namespace.length < 5) {
    errors.push('minimum length of parameters not satisfied: fingerprint(5), key(1), namespace(5)')
  }

  if (fingerprint.length > 100 || key.length > 100 || namespace.length > 100 || value.length > 2000) {
    errors.push('maximum length of parameters exceeded: fingerprint(100), key(100), namespace(100), value(2000)')
  }

  if (errors.length > 0) {
    return new Error(errors.join(', '))
  }
  return null
}
