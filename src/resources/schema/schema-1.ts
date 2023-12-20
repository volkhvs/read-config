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
