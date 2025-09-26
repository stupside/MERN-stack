import type { z } from "zod/v4";

export interface Schema {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  result?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
}
