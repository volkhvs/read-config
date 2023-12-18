import { TomlParser } from './TomlParser';

describe('TomlParser', () => {
  it('should correctly parse TOML files', async () => {
    const parser = new TomlParser(`${__dirname}/../resources/config/test.toml`);
    const testObject = {
      title: 'TOML Example',
      owner: { name: 'John Doe', age: 30 },
    };

    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(true);
    expect(parsed.data).toEqual(testObject);
    expect(parsed.errorMessage).toEqual(null);
  });
});
