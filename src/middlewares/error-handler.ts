import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../errors/api-error'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }
  return res.status(500).send({
    errors: [{ message: 'Something went wrong 🤖' }],
  })
}
