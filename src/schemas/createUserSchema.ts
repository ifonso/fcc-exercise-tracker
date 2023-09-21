import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: "username not provided",
        }),
    }),
});
