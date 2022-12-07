import { ApiError } from './api-error'

export class NotFound extends ApiError {
  constructor() {
    super('Not Found')
    Object.setPrototypeOf(this, NotFound.prototype)
  }

  statusCode = 404
  serializeErrors() {
    return [{ message: 'Not Found' }]
  }
}
