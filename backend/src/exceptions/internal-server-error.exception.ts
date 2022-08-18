export class InternalServerErrorException extends Error {
  /**
   * Instantiate an `InternalServerErrorException` Exception.
   *
   * @example
   * `throw new InternalServerErrorException()`
   *
   * @usageNotes
   * The HTTP response status code will be 500.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 500.
   * - `message`: the string `'Internal Server Error'` by default; override this by supplying
   *    a string in the `objectOrError` parameter.
   *
   * @param message string describing the error condition.
   */
  private readonly statusCode: number = 500;
  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.statusCode;
  }
}
