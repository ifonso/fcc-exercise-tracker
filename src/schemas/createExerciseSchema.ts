import { z } from "zod";

export const createExerciseSchema = z.object({
    body: z.object({
        description: z.string({
            required_error: "description not provided",
        }),
        duration: z
            .string({
                required_error: "duration not provided",
            })
            .transform((duration, ctx) => {
                const d = Number(duration);
                if (!Number.isNaN(d) && d > 0) {
                    return d;
                }
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "invalid number",
                });
            }),
        date: z.optional(
            z.string().transform((date, ctx) => {
                const d = new Date(date);
                if (d instanceof Date && isFinite(+d)) {
                    return d;
                }
                ctx.addIssue({
                    code: z.ZodIssueCode.invalid_date,
                });
                return z.NEVER;
            }),
        ),
    }),
    params: z.object({
        _id: z.string({
            required_error: "id not provided",
        }),
    }),
});
