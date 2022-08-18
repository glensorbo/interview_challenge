export class UnauthorizedException extends Error {
  /**
   * Instantiate an `UnauthorizedException` Exception.
   *
   * @example
   * `throw new UnauthorizedException()`
   *
   * @usageNotes
   * The HTTP response status code will be 401.
   *
   * This status code is similar to the '403 Forbidden' status code,
   * except that in situations resulting in this status code,
   * user authentication can allow access to the resource.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 401.
   * - `message`: the string `'Unauthorized'` by default; override this by supplying
   *    a string in the `message` parameter.
   *
   * @param message string describing the error condition.
   */
  private readonly statusCode: number = 401;
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.statusCode;
  }
}
