import { SchemaReadResult } from './SchemaReadResult';

export abstract class Schema {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  abstract parse(): Promise<SchemaReadResult>;
}
