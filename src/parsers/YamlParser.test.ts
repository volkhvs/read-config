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
});
