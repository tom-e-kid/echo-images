import { ApiError } from './api-error'
import { z } from 'zod'

export class ValidationError extends ApiError {
  constructor(public e: z.ZodError) {
    super('Invalid request params')
    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  statusCode = 400
  serializeErrors() {
    return this.e.issues.map((i) => ({
      message: i.message,
      field: i.path.join('/'),
    }))
  }
}
