import type { z } from "zod/v4";
import type { Schema } from "../schemas";

type InferResult<T extends Schema> = T["result"] extends z.ZodTypeAny
  ? z.infer<T["result"]>
  : undefined;

// Extract parameter names from URL template like "/users/:id/posts/:postId" -> "id" | "postId"
type ExtractParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<`/${Rest}`>
  : T extends `${string}:${infer Param}`
  ? Param
  : never;

// Check if URL params match schema params
type ValidateUrlParams<
  TUrl extends string,
  TSchema extends Schema
> = TSchema["params"] extends z.ZodTypeAny
  ? keyof z.infer<TSchema["params"]> extends ExtractParams<TUrl>
    ? ExtractParams<TUrl> extends keyof z.infer<TSchema["params"]>
      ? TUrl
      : never
    : never
  : ExtractParams<TUrl> extends never
  ? TUrl
  : never;

export const makeRequest = async <
  T extends Schema,
  TUrl extends string
>(
  url: ValidateUrlParams<TUrl, T>,
  method: "GET" | "POST" | "PUT" | "DELETE",
  schema: T,
  options: {
    body?: T["body"] extends z.ZodTypeAny ? z.infer<T["body"]> : undefined;
    query?: T["query"] extends z.ZodTypeAny ? z.infer<T["query"]> : undefined;
    params?: T["params"] extends z.ZodTypeAny
    ? z.infer<T["params"]>
    : undefined;
    headers?: Record<string, string>;
  } = {},
): Promise<InferResult<T>> => {
  const body = options.body ? schema.body?.parse(options.body) : undefined;
  const query = options.query ? schema.query?.parse(options.query) : undefined;

  const target = new URL(url);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      target.searchParams.append(key, String(value));
    });
  }

  const params = options.params
    ? schema.params?.parse(options.params)
    : undefined;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      target.pathname = target.pathname.replace(`:${key}`, String(value));
    });
  }

  const response = await fetch(target, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (schema.result) {
    const data = await response.json();
    return schema.result.parseAsync(data) as InferResult<T>;
  }

  return undefined as InferResult<T>;
};
