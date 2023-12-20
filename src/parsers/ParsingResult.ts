export class ParsingResult {
  public data: object | null;

  public isSuccess: boolean;

  public errorMessage: string | null;

  constructor(
    data: object | null,
    isSuccess: boolean,
    errorMessage: string | null,
  ) {
    this.errorMessage = errorMessage;
    this.isSuccess = isSuccess;
    this.data = data;
  }

  static success(data: object): ParsingResult {
    return new ParsingResult(data, true, null);
  }

  static failure(errorMessage: string): ParsingResult {
    return new ParsingResult(null, false, errorMessage);
  }
}
