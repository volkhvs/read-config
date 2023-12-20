import { JsonParser } from './JsonParser';

describe('JsonParser', () => {
  it('should correctly parse JSON config files', async () => {
    const parser = new JsonParser(`${__dirname}/../resources/config/test.json`);
    const testObject = { name: 'John', surname: 'Doe', age: 30 };

    // Test
    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(true);
    expect(parsed.data).toEqual(testObject);
    expect(parsed.errorMessage).toEqual(null);
  });

  it('should fail to parse empty file', async () => {
    const parser = new JsonParser(
      `${__dirname}/../resources/config/test-empty.txt`,
    );

    // Test
    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(false);
    expect(parsed.data).toEqual(null);
    expect(parsed.errorMessage).toEqual(
      'Error reading file: Unexpected end of JSON input',
    );
  });

  it('should fail to parse invalid JSON config files', async () => {
    const parser = new JsonParser(
      `${__dirname}/../resources/config/test-invalid.json`,
    );

    // Test
    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(false);
    expect(parsed.data).toEqual(null);
    expect(parsed.errorMessage).toEqual(
      'Error reading file: Unexpected token \'u\', "username: john.doe" is not valid JSON',
    );
  });
});
