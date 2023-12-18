import * as core from '@actions/core';
import run from './main';

jest.mock('@actions/core');

function mockForInput(
  fileName: string,
  parserType: string,
  schemaFilePath: string,
): void {
  jest
    .spyOn(core, 'getInput')
    .mockReturnValueOnce(`${__dirname}/../resources/config/${fileName}`)
    .mockReturnValueOnce(parserType)
    .mockReturnValueOnce(schemaFilePath);
}

function mockForInputWithoutSchema(fileName: string, parserType: string): void {
  jest
    .spyOn(core, 'getInput')
    .mockReturnValueOnce(`${__dirname}/../resources/config/${fileName}`)
    .mockReturnValueOnce(parserType);
}

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
      `Error: ENOENT: no such file or directory, open '${__dirname}/../resources/config/test1.json'`,
    );
    expect(core.setOutput).not.toHaveBeenCalled();
  });
});
