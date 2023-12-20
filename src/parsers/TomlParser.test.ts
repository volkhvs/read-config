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

  it('should fail to parse empty file', async () => {
    const parser = new TomlParser(
      `${__dirname}/../resources/config/test-empty.txt`,
    );

    // Test
    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(false);
    expect(parsed.data).toEqual(null);
    expect(parsed.errorMessage).toEqual('Empty TOML file content!');
  });
});
