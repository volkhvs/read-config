// YamlParser.ts
import { Parser } from './Parser';
import * as yaml from 'js-yaml';
import { ParsingResult } from './ParsingResult';
import * as core from '@actions/core';

export class YamlParser extends Parser {
  parseContent(fileContent: string): ParsingResult {
    const yamlData = yaml.load(fileContent);
    if (!yamlData || yamlData === 'invalid yaml') {
      return ParsingResult.failure(
        'Empty file or error in reading the yaml file!',
      );
    }
    return ParsingResult.success(yamlData);
  }
}
