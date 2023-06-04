import { ValidationSchema } from "../interfaces/Types/validation";
import DateValidator from "./DateValidator";

export const createUserValidationSchema: ValidationSchema = {
  username: {
    required: true,
    type: 'string',
    errorMessage: 'No username provided.',
  },
};

export const saveExerciseValidationSchema: ValidationSchema = {
  description: {
    required: true,
    type: "string",
    errorMessage: "No description provided.",
  },
  duration: {
    required: true,
    type: "number",
    errorMessage: "No duration provided.",
  },
  _id: {
    required: true,
    type: "string",
    errorMessage: "No id provided.",
  },
  date: {
    required: false,
    type: "string",
    custom: DateValidator.isValidDate,
    errorMessage: "Invalid date.",
  },
}

export const getUsersLogValidationSchema: ValidationSchema = {
  _id: {
    required: true,
    type: 'string',
    errorMessage: 'No user id (_id) provided.',
  },
  from: {
    required: false,
    type: 'string',
    custom: DateValidator.isValidDate,
    errorMessage: 'Invalid date in "from" query parameter.',
  },
  to: {
    required: false,
    type: 'string',
    custom: DateValidator.isValidDate,
    errorMessage: 'Invalid date in "to" query parameter.',
  },
  limit: {
    required: false,
    type: 'string',
    custom: (value: string) => !isNaN(Number(value)),
    errorMessage: 'Invalid number in "limit" query parameter.',
  },
};