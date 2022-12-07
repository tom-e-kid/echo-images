export abstract class ApiError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  abstract statusCode: number
  abstract serializeErrors(): { message: string; field?: string }[]
}
