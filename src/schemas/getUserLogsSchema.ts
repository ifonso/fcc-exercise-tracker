import { z } from "zod";

export const getUserLogsSchema = z.object({
    params: z.object({
        _id: z.string({
            required_error: "id not provided",
        }),
    }),
    query: z.object({
        from: z.optional(
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
        to: z.optional(
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
        limit: z.optional(
            z.string().transform((limit, ctx) => {
                const l = Number(limit);
                if (!Number.isNaN(l) && l > 0) {
                    return l;
                }
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "invalid number",
                });
            }),
        ),
    }),
});
