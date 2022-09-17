import {isEmpty, toSentenceCase} from "services/utilities";

const schemaFunction = {
  required: (obj, key, schema) => {
    if (!schema[key].required) return [];
    return isEmpty(obj[key]) ? [`${toSentenceCase(key)} can't be empty`] : [];
  },
  pattern: (obj, key, schema) => {
    if (!schema[key].pattern) return [];
    return !schema[key].pattern.test(obj[key])
      ? [`${toSentenceCase(key)} is invalid`]
      : [];
  },
  length: (obj, key, schema) => {
    if (!schema[key].length) return [];
    let errors = [];
    const {max, min} = schema[key].length;

    if (max && obj[key].length > max)
      errors = [`${toSentenceCase(key)} should not exceed ${max} characters`];

    if (min && obj[key].length < min)
      errors = [
        ...errors,
        `${toSentenceCase(key)} should have at least ${min} characters`,
      ];

    return errors;
  },
};

const validate = (obj, schema) => {
  const initialErrorList = Object.entries(schema).reduce((acc, [key, requirements]) => {
    Object.keys(requirements).forEach((requirement) => {
      acc[key] = [...(acc[key] || []), ...schemaFunction[requirement](obj, key, schema)];
    });
    return acc;
  }, {});

  // remove keys with empty arrays
  return Object.entries(initialErrorList).reduce((finalErrorList, [key, errors]) => {
    if (!isEmpty(errors)) finalErrorList[key] = errors;
    return finalErrorList;
  }, {});
};

export default validate;
