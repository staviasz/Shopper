export type ObjectError = { error_code: string; error_description: string };

export class CustomError extends Error {
  constructor(error: ObjectError) {
    super(error.error_description);
    this.name = error.error_code;
  }
}
