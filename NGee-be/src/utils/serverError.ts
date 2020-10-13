interface IServerError {
  statusCode: number
}

export class ServerError extends Error implements IServerError {
  statusCode: number

  constructor(message: string, code: number) {
    super(message)
    this.statusCode = code
    Error.captureStackTrace(this, this.constructor)
  }
}

export const ErrorHandler = (
  err: ServerError,
  req: any,
  res: any,
  next: any
) => {
  console.log(err.stack)

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  })
}
