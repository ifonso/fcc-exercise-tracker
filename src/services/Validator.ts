import { ValidationSchema } from "../interfaces/Types/validation";

export default class Validator {
  
  validateRequest(schema: ValidationSchema, data: any) {
    for (const key in schema) {
      const value = data[key];
      const rules = schema[key];

      if (rules.required && (value === null || value === undefined)) {
        throw new Error(rules.errorMessage || `Missing required field: ${key}`);
      }

      if (rules.type && typeof value !== rules.type) {
        throw new Error(rules.errorMessage || `Expected ${key} to be of type ${rules.type}, got ${typeof value}`);
      }

      if (rules.custom && !rules.custom(value)) {
        throw new Error(rules.errorMessage || `Invalid value for field: ${key}`);
      }
    }
  }
}