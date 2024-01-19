import { APIGatewayProxyEvent } from 'aws-lambda'
import { eventBodyInterface } from './create'

export const getValidationErrors = (event: APIGatewayProxyEvent): Error => {
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

export const createValidationErrors = (event: APIGatewayProxyEvent): Error | null => {
    const data: eventBodyInterface = JSON.parse(event.body || '{}');
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