export class BadRequestException extends Error {
  /**
   * Instantiate a `BadRequestException` Exception.
   *
   * @example
   * `throw new BadRequestException()`
   *
   * @usageNotes
   * The HTTP response status code will be 400.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 400.
   * - `message`: the string `'Bad Request'` by default; override this by supplying
   *    a string in the `message` parameter.
   *
   *
   * @param message string describing the error condition.
   */
  private readonly statusCode: number = 400;
  constructor(message: string = 'Bad Request') {
    super(message);
    this.statusCode;
  }
}
