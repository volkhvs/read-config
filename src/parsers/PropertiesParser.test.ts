import { PropertiesParser } from './PropertiesParser';

describe('PropertiesParser', () => {
  it('should correctly parse properties files', async () => {
    const parser = new PropertiesParser(
      `${__dirname}/../resources/config/test.properties`,
    );
    const testObject = {
      user: { name: 'John', surname: 'Doe' },
      emails: ['john.doe@test.com', 'j.doe@gmail.com'],
      age: 30,
      active: true,
    };

    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(true);
    expect(parsed.data).toEqual(testObject);
    expect(parsed.errorMessage).toEqual(null);
  });

  it('should fail to parse empty file', async () => {
    const parser = new PropertiesParser(
      `${__dirname}/../resources/config/test-empty.txt`,
    );

    // Test
    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(false);
    expect(parsed.data).toEqual(null);
    expect(parsed.errorMessage).toEqual('Empty properties file content!');
  });
});
