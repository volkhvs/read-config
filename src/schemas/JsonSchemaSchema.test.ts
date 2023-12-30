import { JsonSchemaSchema } from './JsonSchemaSchema';

describe('JsonSchemaSchema', () => {
  it('should correctly parse ts files with schema', async () => {
    const schema = new JsonSchemaSchema(
      `${__dirname}/../resources/schema/schema-1.json`,
    );
    const invalidTestObject = {
      username: 'john.doe',
      emails: ['john.doe@test.com', 'j.doe@gmail.com'],
      age: 30,
    };

    const validTestObject = {
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

    const parsed = await schema.parse();
    expect(parsed.isSuccess).toEqual(true);
    expect(parsed.data?.isValidSync(invalidTestObject)).toEqual(false);
    expect(parsed.data?.isValidSync(validTestObject)).toEqual(true);
    expect(parsed.errorMessage).toEqual(null);
  });

  it('should fail to invalid json file', async () => {
    const filePath = `${__dirname}/../resources/schema/invalid-schema-1.json`;

    const parser = new JsonSchemaSchema(filePath);

    // Test
    const parsed = await parser.parse();
    expect(parsed.isSuccess).toEqual(false);
    expect(parsed.data).toEqual(null);
    expect(parsed.errorMessage).toEqual(
      `Error reading json schema from file: ${filePath}`,
    );
  });
});
