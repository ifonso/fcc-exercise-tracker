import { Request } from "express";
import { z, AnyZodObject, ZodError } from "zod";

export async function zParse<T extends AnyZodObject>(
    schema: T,
    request: Request,
): Promise<z.infer<T>> {
    try {
        return schema.parseAsync(request);
    } catch (error) {
        return {
            error: error instanceof ZodError ? error.message : "bad request",
        };
    }
}
