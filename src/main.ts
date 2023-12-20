import * as core from '@actions/core';
import { Parser } from './parsers/Parser';
import { YamlParser } from './parsers/YamlParser';
import { JsonParser } from './parsers/JsonParser';
import { TomlParser } from './parsers/TomlParser';
import { PropertiesParser } from './parsers/PropertiesParser';
import { ParsingResult } from './parsers/ParsingResult';

async function run() {
  try {
    const filePath = core.getInput('file_path', { required: true });
    const parserType = core.getInput('parser_type', { required: true });
    const schemaFilePath = core.getInput('schema_file_path', {
      required: false,
    });

    const parser: Parser = createParser(parserType, filePath);
    const parsingResult: ParsingResult = await parser.parse();
    if (!parsingResult.isSuccess && parsingResult.errorMessage) {
      core.setFailed(parsingResult.errorMessage);
      return;
    }

    const config = !schemaFilePath
      ? parsingResult.data
      : await validate(parsingResult.data, schemaFilePath);

    core.info('Running with config:');
    core.info(JSON.stringify(config, null, 2));

    core.setOutput('config', config);
  } catch (error: unknown) {
    core.setFailed(error as Error);
  }
}

async function validate(obj: unknown, schemaFilePath: string): Promise<string> {
  const schemaDynamicImport = await import(schemaFilePath);
  // We are expecting that all schema files are exporting schema as default
  return await schemaDynamicImport.default.validate(obj, {
    stripUnknown: false,
  });
}

function createParser(parserType: string, filePath: string): Parser {
  switch (parserType.toLowerCase()) {
    case 'yaml': {
      return new YamlParser(filePath);
    }
    case 'json': {
      return new JsonParser(filePath);
    }
    case 'toml': {
      return new TomlParser(filePath);
    }
    case 'properties': {
      return new PropertiesParser(filePath);
    }
    default: {
      throw new Error(`Unsupported parser type ${parserType}!`);
    }
  }
}

export default run;
