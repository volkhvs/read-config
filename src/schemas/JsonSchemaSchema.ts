import { Schema } from './Schema';
import { SchemaReadResult } from './SchemaReadResult';
import fs from 'fs/promises';
import { buildYup } from 'schema-to-yup';

export class JsonSchemaSchema extends Schema {
  async parse(): Promise<SchemaReadResult> {
    try {
      const fileContent: string = await fs.readFile(this.filePath, 'utf8');
      if (fileContent.trim() === '') {
        SchemaReadResult.failure(`File ${this.filePath} is empty`);
      }
      const yupSchema = buildYup(JSON.parse(fileContent));
      return SchemaReadResult.success(yupSchema);
    } catch (error) {
      return SchemaReadResult.failure(
        `Error reading json schema from file: ${this.filePath}`,
      );
    }
  }
}
