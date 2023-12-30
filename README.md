# read-config

GitHub Action for config read

## Schema of config file

Schema is not required, but it is recommended to use it. Schema is used to validate the config file. If the config file is not valid, the action will fail.

### TypeScript

Action expects a schema file to be present in the project.
The schema file is a TypeScript file that exports a yup schema object.
The schema object is used to validate the config file.
The schema file can be named anything, but it must be a TypeScript file.

Example of TypeScript schema file

```ts
import * as yup from 'yup';

/**
 * A yup object that doesn't allow unknown keys
 */
const strictObject = (shape?: yup.ObjectShape) => {
  const obj = yup.object().noUnknown();
  if (shape) {
    return obj.shape(shape);
  }
  return obj;
};

const schema = strictObject({
  java: strictObject()
    .meta({ description: 'Java-specific configuration' })
    .shape({
      version: yup
        .string()
        .meta({ description: 'The version of Java your project uses' })
        .default('17'),
      distribution: yup
        .string()
        .meta({ description: 'The version of Java your project uses' }),
      installer_path: yup
        .string()
        .meta({ description: 'The java installer path' }),
    }),
  execute_tests_on_main_branch: yup
    .boolean()
    .meta({ description: 'Should tests be executed on main branch' })
    .required(),
  modules: yup
    .array()
    .meta({ description: 'Project modules configuration' })
    .of(
      strictObject()
        .meta({ description: 'Java-specific configuration' })
        .shape({
          name: yup.string().meta({ description: 'Module name' }).required(),
          path: yup.string().meta({ description: 'Module path' }).required(),
        }),
    ),
});

export default schema;
```

### JsonSchema

Action expects a schema file to be present in the project. The schema file is a JSON file that contains a JSON schema object.
The schema object is used to validate the config file.
The schema file can be named anything, but it must be a JSON file.

https://github.com/kristianmandrup/schema-to-yup is used to convert JSON schema to yup schema.

Example of JsonSchema file

```json
{
  "$schema": "https://volkhvs.github.io/read-config/schema.json",
  "title": "CiConfig",
  "description": "CiConfig",
  "type": "object",
  "properties": {
    "java": {
      "type": "object",
      "properties": {
        "version": {
          "type": "string",
          "default": "17"
        },
        "distribution": {
          "type": "string"
        },
        "installer_path": {
          "type": "string"
        }
      }
    },
    "execute_tests_on_main_branch": {
      "type": "boolean",
      "required": true
    },
    "modules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "path": {
            "type": "string"
          }
        }
      }
    }
  }
}
```
