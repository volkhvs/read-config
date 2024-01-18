import { Schema } from './Schema';
import { SchemaReadResult } from './SchemaReadResult';
import { AnyObjectSchema } from 'yup';

export class NonExistingSchema extends Schema {
  async parse(): Promise<SchemaReadResult> {
    return SchemaReadResult.success({} as AnyObjectSchema);
  }
}
