import { ValidationSchema } from "../Types/validation";

export default interface ValidationManager {
  validateRequest(schema: ValidationSchema, data: any): void;
}