export class NotFoundException extends Error {
  /**
   * Instantiate a `NotFoundException` Exception.
   *
   * @example
   * `throw new NotFoundException()`
   *
   * @usageNotes
   * The HTTP response status code will be 404.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 404.
   * - `message`: the string `'Requested resource was not found, please try again'`
   *    by default; override this by supplying a string in the `message` parameter.
   *
   * @param message string describing the error condition.
   */
  private readonly statusCode: number = 404;
  constructor(
    message: string = 'Requested resource was not found, please try again'
  ) {
    super(message);
    this.statusCode;
  }
}
