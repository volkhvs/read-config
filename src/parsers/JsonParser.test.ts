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
});
