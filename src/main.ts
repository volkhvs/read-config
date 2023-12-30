import * as core from '@actions/core';
import { Parser } from './parsers/Parser';
import { YamlParser } from './parsers/YamlParser';
import { JsonParser } from './parsers/JsonParser';
import { TomlParser } from './parsers/TomlParser';
import { PropertiesParser } from './parsers/PropertiesParser';
import { ParsingResult } from './parsers/ParsingResult';
import { TypeScriptSchema } from './schemas/TypeScriptSchema';
import { Schema } from './schemas/Schema';
import { SchemaReadResult } from './schemas/SchemaReadResult';
import { AnyObjectSchema } from 'yup';
import { NonExistingSchema } from './schemas/NonExistingSchema';
import { JsonSchemaSchema } from './schemas/JsonSchemaSchema';

async function run() {
  try {
    const filePath = core.getInput('file_path', { required: true });
    const parserType = core.getInput('parser_type', { required: true });
    const schemaFilePath = core.getInput('schema_file_path', {
      required: false,
    });

    const schema: Schema = createSchema(schemaFilePath);
    const schemaParsingResult: SchemaReadResult = await schema.parse();
    if (!schemaParsingResult.isSuccess && schemaParsingResult.errorMessage) {
      core.setFailed(schemaParsingResult.errorMessage);
      return;
    }

    const parser: Parser = createParser(parserType, filePath);
    const parsingResult: ParsingResult = await parser.parse();
    if (!parsingResult.isSuccess && parsingResult.errorMessage) {
      core.setFailed(parsingResult.errorMessage);
      return;
    }

    const config = !schemaFilePath
      ? parsingResult.data
      : await validate(parsingResult.data, schemaParsingResult.data!);

    core.info('Running with config:');
    core.info(JSON.stringify(config, null, 2));

    core.setOutput('config', config);
  } catch (error: unknown) {
    core.setFailed(error as Error);
  }
}

async function validate(
  obj: unknown,
  schema: AnyObjectSchema,
): Promise<string> {
  return await schema.validate(obj, {
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

function createSchema(filePath: string): Schema {
  if (!filePath) {
    return new NonExistingSchema(filePath);
  }
  switch (filePath.split('.').pop()?.toLowerCase()) {
    case 'ts': {
      return new TypeScriptSchema(filePath);
    }
    case 'json': {
      return new JsonSchemaSchema(filePath);
    }
    default: {
      throw new Error(`Unsupported schema type ${filePath}!`);
    }
  }
}

export default run;
