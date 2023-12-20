import * as fs from 'fs/promises';
import { ParsingResult } from './ParsingResult';

// Abstract class for a parsers
export abstract class Parser {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async parse(): Promise<ParsingResult> {
    try {
      const fileContent: string = await fs.readFile(this.filePath, 'utf8');
      if (fileContent.trim() === '') {
        ParsingResult.failure(`File ${this.filePath} is empty`);
      }
      return this.parseContent(fileContent);
    } catch (error) {
      if (error instanceof Error) {
        return ParsingResult.failure(`Error reading file: ${error.message}`);
      } else {
        return ParsingResult.failure(`${error}`);
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  abstract parseContent(fileContent: string): ParsingResult;
}
