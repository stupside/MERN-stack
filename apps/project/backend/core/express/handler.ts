import type { RequestHandler } from "express";
import type { z } from "zod";

export interface Schema {
    body?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    result?: z.ZodTypeAny;
    params?: z.ZodTypeAny;
}

export type SchemaHandler<TSchema extends Schema> = RequestHandler<
    TSchema['params'] extends z.ZodTypeAny ? z.infer<TSchema['params']> : undefined,
    TSchema['result'] extends z.ZodTypeAny ? z.infer<TSchema['result']> : undefined,
    TSchema['body'] extends z.ZodTypeAny ? z.infer<TSchema['body']> : undefined,
    TSchema['query'] extends z.ZodTypeAny ? z.infer<TSchema['query']> : undefined
>;

// Just validate, don't infer
function validate<TSchema extends Schema>(schema: TSchema): SchemaHandler<TSchema> {
    return async (req, _, next) => {
        try {
            if (schema.body) await schema.body.parseAsync(req.body);
            if (schema.query) await schema.query.parseAsync(req.query);
            if (schema.params) await schema.params.parseAsync(req.params);
            return next();
        } catch (error) {
            return next(error);
        }
    };
}

// Helper type for manual typing
export const createHandler = <TSchema extends Schema>(
    schema: TSchema,
    handler: SchemaHandler<TSchema>,
): [SchemaHandler<TSchema>, SchemaHandler<TSchema>] => [validate(schema), handler];