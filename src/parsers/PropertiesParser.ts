// PropertiesParser.ts
import { Parser } from './Parser';
import { ParsingResult } from './ParsingResult';

export class PropertiesParser extends Parser {
  parseContent(fileContent: string): ParsingResult {
    if (fileContent.trim() === '') {
      return ParsingResult.failure('Empty properties file content!');
    }
    const obj: any = {};
    const lines = fileContent.split('\n');

    for (const line of lines) {
      if (line.trim() !== '') {
        this.parseLine(line, obj);
      }
    }

    return ParsingResult.success(obj);
  }

  private parseLine(line: string, obj: any) {
    const [key, value] = line.split('=').map((part) => part.trim());
    if (!key || value === undefined) {
      throw new Error('Invalid line: ' + line);
    }

    let currentObject = obj;
    const keys = key.split('.');
    keys.forEach((k, index) => {
      if (k.includes('[')) {
        const arrayMatch = k.match(/(.+)\[(\d+)\]/);
        if (arrayMatch) {
          const arrayKey = arrayMatch[1];
          const arrayIndex = parseInt(arrayMatch[2]);

          if (!currentObject[arrayKey]) {
            currentObject[arrayKey] = [];
          }

          if (index === keys.length - 1) {
            currentObject[arrayKey][arrayIndex] = this.parseValue(value);
          } else {
            if (!currentObject[arrayKey][arrayIndex]) {
              currentObject[arrayKey][arrayIndex] = {};
            }
            currentObject = currentObject[arrayKey][arrayIndex];
          }
        }
      } else {
        if (index === keys.length - 1) {
          currentObject[k] = this.parseValue(value);
        } else {
          if (!currentObject[k]) {
            currentObject[k] = {};
          }
          currentObject = currentObject[k];
        }
      }
    });
  }

  private parseValue(value: string): any {
    if (!isNaN(Number(value))) {
      return Number(value);
    } else if (
      value.toLowerCase() === 'true' ||
      value.toLowerCase() === 'false'
    ) {
      return value.toLowerCase() === 'true';
    }
    return value.replace(/^"(.+(?="$))"$/, '$1');
  }
}
