import type { ObjectError } from '@/domain/entities/measure/errors/custon-error';
import { ServerError } from '@/presentation/errors';
import type { ControllerResponseType } from '@/presentation/types';

type ObjectErrorReturnType = ObjectError | ObjectError[];

export const ok = (data: any): ControllerResponseType => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): ControllerResponseType => ({
  statusCode: 204,
  body: null,
});

export const badRequest = (error: ObjectErrorReturnType): ControllerResponseType => ({
  statusCode: 400,
  body: error,
});

export const doubleRequest = (error: ObjectErrorReturnType): ControllerResponseType => ({
  statusCode: 409,
  body: error,
});

export const unauthorized = (error: ObjectErrorReturnType): ControllerResponseType => ({
  statusCode: 401,
  body: error,
});

export const forbidden = (error: ObjectErrorReturnType): ControllerResponseType => ({
  statusCode: 403,
  body: error,
});
export const notFound = (error: ObjectErrorReturnType): ControllerResponseType => ({
  statusCode: 404,
  body: error,
});

export const serverError = (error: Error): ControllerResponseType => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
