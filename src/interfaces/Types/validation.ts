export type ValidationSchema = {
  [key: string]: {
    required?: boolean,
    type?: 'string' | 'number',
    custom?: (value: any) => boolean,
    errorMessage?: string,
  },
}