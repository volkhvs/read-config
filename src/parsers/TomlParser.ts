// TomlParser.ts
import { Parser } from './Parser';
import * as toml from '@iarna/toml';
import { ParsingResult } from './ParsingResult';

export class TomlParser extends Parser {
  parseContent(fileContent: string): ParsingResult {
    const result = toml.parse(fileContent);
    if (!result) {
      return ParsingResult.failure(
        'Empty file or error in reading the yaml file!',
      );
    }
    return ParsingResult.success(result);
  }
}
