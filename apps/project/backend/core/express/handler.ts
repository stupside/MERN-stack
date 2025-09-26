import type { RequestHandler } from "express";
import type { z } from "zod";

export interface Schema {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  result?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
}

export type SchemaHandler<TSchema extends Schema> = RequestHandler<
  TSchema["params"] extends z.ZodTypeAny
  ? z.infer<TSchema["params"]>
  : undefined,
  TSchema["result"] extends z.ZodTypeAny
  ? z.infer<TSchema["result"]>
  : undefined,
  TSchema["body"] extends z.ZodTypeAny ? z.infer<TSchema["body"]> : undefined,
  TSchema["query"] extends z.ZodTypeAny ? z.infer<TSchema["query"]> : undefined
>;

// Just validate, don't infer
function validate<TSchema extends Schema>(
  schema: TSchema,
): SchemaHandler<TSchema> {
  return async (req, _, next) => {
    try {
      if (schema.body) {
        const parsedBody = await schema.body.parseAsync(req.body);
        Object.defineProperty(req, 'body', {
          value: parsedBody,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
      if (schema.query) {
        const parsedQuery = await schema.query.parseAsync(req.query);
        Object.defineProperty(req, 'query', {
          value: parsedQuery,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
      if (schema.params) {
        const parsedParams = await schema.params.parseAsync(req.params);
        Object.defineProperty(req, 'params', {
          value: parsedParams,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
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
): [SchemaHandler<TSchema>, SchemaHandler<TSchema>] => [
    validate(schema),
    handler,
  ];
