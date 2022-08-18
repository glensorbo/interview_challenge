export class ForbiddenException extends Error {
  /**
   * Instantiate a `ForbiddenException` Exception.
   *
   * @example
   * `throw new ForbiddenException()`
   *
   * @usageNotes
   * The HTTP response status code will be 403.
   *
   * This status is similar to 401, but for the '403 Forbidden' status code re-authenticating makes no difference.
   * The access is permanently forbidden and tied to the application logic, such as insufficient rights to a resource.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 403.
   * - `message`: the string `'Forbidden'` by default; override this by supplying
   *   a string in the `objectOrError` parameter.
   *
   * @param message string describing the error condition.
   */
  private readonly statusCode: number = 403;
  constructor(message: string = 'Forbidden') {
    super(message);
    this.statusCode;
  }
}
