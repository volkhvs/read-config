/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
import { Schema } from './Schema';
import { SchemaReadResult } from './SchemaReadResult';
import { AnyObjectSchema } from 'yup';

export class TypeScriptSchema extends Schema {
  parseContent(_fileContent: string): SchemaReadResult {
    throw new Error('Method not implemented.');
  }

  async parse(): Promise<SchemaReadResult> {
    const isAnyObjectSchemaType = (schema: any): schema is AnyObjectSchema =>
      schema.fields !== undefined;
    const schemaDynamicImport = await import(this.filePath);
    const schema = schemaDynamicImport.default;
    if (!schema || !isAnyObjectSchemaType(schema)) {
      return SchemaReadResult.failure(
        `File ${this.filePath} does not export schema as default`,
      );
    }

    // We are expecting that all schema files are exporting schema as default
    return SchemaReadResult.success(schemaDynamicImport.default);
  }
}
