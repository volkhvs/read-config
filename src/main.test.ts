import * as core from '@actions/core';
import run from './main';
import { ValidationError } from 'yup';

jest.mock('@actions/core');

function mockForInput(
  fileName: string,
  parserType: string,
  schemaName: string,
): void {
  jest
    .spyOn(core, 'getInput')
    .mockReturnValueOnce(`${__dirname}/resources/config/${fileName}`)
    .mockReturnValueOnce(parserType)
    .mockReturnValueOnce(`${__dirname}/resources/schema/${schemaName}`);
}

function mockForInputWithoutSchema(fileName: string, parserType: string): void {
  jest
    .spyOn(core, 'getInput')
    .mockReturnValueOnce(`${__dirname}/resources/config/${fileName}`)
    .mockReturnValueOnce(parserType);
}

const expectedCIConfig = {
  java: {
    version: '17',
    distribution: 'temurin',
  },
  execute_tests_on_main_branch: true,
  modules: [
    {
      name: 'module-1',
      path: 'src/module1',
    },
    {
      name: 'module-2',
      path: 'src/module2',
    },
  ],
};

describe('run', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('handles incorrect parser type', async () => {
    mockForInputWithoutSchema('test.json', 'test');
    await run();
    expect(core.setFailed).toHaveBeenCalledWith(
      new Error('Unsupported parser type test!'),
    );
    expect(core.setOutput).not.toHaveBeenCalled();
  });

  it('handles non-existing json config file', async () => {
    mockForInputWithoutSchema('test1.json', 'json');
    await run();
    expect(core.setFailed).toHaveBeenCalledWith(
      `Error: ENOENT: no such file or directory, open '${__dirname}/resources/config/test1.json'`,
    );
    expect(core.setOutput).not.toHaveBeenCalled();
  });

  it('handles properly yaml config file', async () => {
    mockForInputWithoutSchema('test-ci.yaml', 'yaml');
    await run();
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('config', expectedCIConfig);
  });

  it('handles properly yaml config file with schema validation success', async () => {
    mockForInput('test-ci.yaml', 'yaml', 'schema-1.ts');
    await run();
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('config', expectedCIConfig);
  });

  it('handles properly yaml config file with schema validation failure', async () => {
    mockForInput('test-ci.yaml', 'yaml', 'schema-2.ts');
    await run();
    expect(core.setFailed).toHaveBeenCalledWith(
      new ValidationError(
        'this field has unspecified keys: execute_tests_on_main_branch',
      ),
    );
    expect(core.setOutput).not.toHaveBeenCalled();
  });

  it('handles properly json config file', async () => {
    mockForInputWithoutSchema('test-ci.json', 'json');
    await run();
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('config', expectedCIConfig);
  });

  it('handles properly toml config file', async () => {
    mockForInputWithoutSchema('test-ci.toml', 'toml');
    await run();
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('config', expectedCIConfig);
  });

  it('handles properly properties config file', async () => {
    mockForInputWithoutSchema('test-ci.properties', 'properties');
    await run();
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('config', expectedCIConfig);
  });
});
