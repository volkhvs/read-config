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
});
