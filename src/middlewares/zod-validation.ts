import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { BadRequest } from '../errors/bad-request'
import { ValidationError } from '../errors/validation-error'

const validate = async (req: Request, schema: AnyZodObject) => {
  try {
    return await schema.parseAsync(req)
  } catch (e) {
    if (e instanceof ZodError) {
      throw new ValidationError(e)
    }
    throw new BadRequest(`Invalid request params`)
  }
}

const validation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validate(req, schema)
    next()
  }
}

export { validate as zodValidate, validation as zodValidation }
