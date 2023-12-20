import { YamlParser } from './YamlParser';

describe('YamlParser', () => {
  it('should correctly parse YAML files', async () => {
    const parser = new YamlParser(`${__dirname}/../resources/config/test.yaml`);
    const testObject = {
      username: 'john.doe',
      emails: ['john.doe@test.com', 'j.doe@gmail.com'],
      age: 30,
    };

    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(true);
    expect(parsed.data).toEqual(testObject);
    expect(parsed.errorMessage).toEqual(null);
  });

  it('should fail to parse empty file', async () => {
    const parser = new YamlParser(
      `${__dirname}/../resources/config/test-empty.txt`,
    );

    // Test
    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(false);
    expect(parsed.data).toEqual(null);
    expect(parsed.errorMessage).toEqual(
      'Empty file or error in reading the yaml file!',
    );
  });
});
