import { redirect } from "next/navigation";
import type { z } from "zod/v4";

import type { Schema } from "../schemas";

type InferResult<T extends Schema> = T["result"] extends z.ZodTypeAny
  ? z.infer<T["result"]>
  : undefined;

// Extract parameter names from URL template like "/users/:id/posts/:postId" -> "id" | "postId"
type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<`/${Rest}`>
  : T extends `${string}:${infer Param}`
  ? Param
  : never;

// Check if URL params match schema params
type ValidateUrlParams<
  TUrl extends string,
  TSchema extends Schema,
> = TSchema["params"] extends z.ZodTypeAny
  ? keyof z.infer<TSchema["params"]> extends ExtractParams<TUrl>
  ? ExtractParams<TUrl> extends keyof z.infer<TSchema["params"]>
  ? TUrl
  : never
  : never
  : ExtractParams<TUrl> extends never
  ? TUrl
  : never;

export const makeRequest = async <T extends Schema, TUrl extends string>(
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
) => {

  const target = new URL(url);

  if (options.query) {
    if (!schema.query) {
      throw new Error("No query schema defined");
    }

    const query = await schema.query.safeParseAsync(options.query)

    if (!query.success) {
      return {
        error: simplifyZodError(query.error),
        value: undefined,
      }
    }

    Object.entries(query.data as Record<string, unknown>).forEach(([key, value]) => {
      target.searchParams.append(key, String(value));
    });
  }

  if (options.params) {
    if (!schema.params) {
      throw new Error("No params schema defined");
    }

    const params = await schema.params.safeParseAsync(options.params)

    if (!params.success) {
      return {
        error: simplifyZodError(params.error),
        value: undefined,
      };
    }

    if (params.data instanceof Object) {
      Object.entries(params.data).forEach(([key, value]) => {
        target.pathname = target.pathname.replace(`:${key}`, String(value));
      });
    }
  }

  const body = await (async () => {
    if (schema.body) {
      if (!options.body) {
        throw new Error("Request body is required");
      }

      return schema.body.safeParseAsync(options.body);
    }

    return {
      success: true,
      data: undefined,
      error: undefined,
    };
  })()

  if (!body.success) {
    return {
      error: simplifyZodError(body.error),
      value: undefined,
    };
  }

  const response = await fetch(target, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: body.data ? JSON.stringify(body.data) : undefined,
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    redirect("/auth/login");
    return {
      error: [{ path: "", message: response.statusText }],
      value: undefined,
    }
  }

  if (response.status >= 400) {
    const data = await response.json();

    const message = "error" in data ? data.error : response.statusText;

    return {
      error: [{ path: "", message: message }],
      value: undefined,
    }
  }

  if (schema.result) {
    const data = await response.json();
    const value = await schema.result.safeParseAsync(data);
    if (value.success) {
      return {
        error: undefined,
        value: value.data as InferResult<T>,
      }
    }

    return {
      error: simplifyZodError(value.error),
      value: undefined,
    };
  }

  return { error: undefined, value: undefined };
};

const simplifyZodError = (error?: z.ZodError) => {
  return error?.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  })) ?? [];
};
