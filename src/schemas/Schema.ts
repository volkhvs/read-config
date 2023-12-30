/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
import * as fs from 'fs/promises';
import { SchemaReadResult } from './SchemaReadResult';

export abstract class Schema {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async parse(): Promise<SchemaReadResult> {
    try {
      const fileContent: string = await fs.readFile(this.filePath, 'utf8');
      if (fileContent.trim() === '') {
        SchemaReadResult.failure(`File ${this.filePath} is empty`);
      }
      return this.parseContent(fileContent);
    } catch (error) {
      if (error instanceof Error) {
        return SchemaReadResult.failure(`Error reading file: ${error.message}`);
      } else {
        return SchemaReadResult.failure(`${error}`);
      }
    }
  }

  abstract parseContent(_fileContent: string): SchemaReadResult;
}
