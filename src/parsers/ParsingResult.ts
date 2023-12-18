export class ParsingResult {
  constructor(
    public data: object | null,
    public isSuccess: boolean,
    public errorMessage: string | null,
  ) {}

  static success(data: object): ParsingResult {
    return new ParsingResult(data, true, null);
  }

  static failure(errorMessage: string): ParsingResult {
    return new ParsingResult(null, false, errorMessage);
  }
}
