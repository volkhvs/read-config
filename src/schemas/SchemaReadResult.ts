import { AnyObjectSchema } from 'yup';

export class SchemaReadResult {
  public data: AnyObjectSchema | null;

  public isSuccess: boolean;

  public errorMessage: string | null;

  constructor(
    data: AnyObjectSchema | null,
    isSuccess: boolean,
    errorMessage: string | null,
  ) {
    this.errorMessage = errorMessage;
    this.isSuccess = isSuccess;
    this.data = data;
  }

  static success(data: AnyObjectSchema): SchemaReadResult {
    return new SchemaReadResult(data, true, null);
  }

  static failure(errorMessage: string): SchemaReadResult {
    return new SchemaReadResult(null, false, errorMessage);
  }
}
