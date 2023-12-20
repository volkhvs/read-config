// JsonParser.ts
import { Parser } from './Parser';
import { ParsingResult } from './ParsingResult';

export class JsonParser extends Parser {
  parseContent(fileContent: string): ParsingResult {
    return ParsingResult.success(JSON.parse(fileContent));
  }
}
