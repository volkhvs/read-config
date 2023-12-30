/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
import { Schema } from './Schema';
import { SchemaReadResult } from './SchemaReadResult';
import { AnyObjectSchema } from 'yup';

export class NonExistingSchema extends Schema {
  parseContent(_fileContent: string): SchemaReadResult {
    throw new Error('Method not implemented.');
  }

  async parse(): Promise<SchemaReadResult> {
    return SchemaReadResult.success({} as AnyObjectSchema);
  }
}
