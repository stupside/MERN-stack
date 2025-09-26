import { z } from "zod/v4";

import { token } from "../auth/service";

export const request = async <
  TParams extends z.ZodTypeAny,
  TResBody extends z.ZodTypeAny,
  TReqBody extends z.ZodTypeAny,
>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  options: {
    body?: z.infer<TReqBody>;
    params?: z.infer<TParams>;
    headers?: Record<string, string>;
  },
  schemas: {
    params?: TParams;
    result?: TResBody;
    request?: TReqBody;
  },
) => {
  if (options.body) {
    await schemas.request?.parseAsync(options.body);
  }
  if (options.params) {
    await schemas.params?.parseAsync(options.params);
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
  if (schemas.result) {
    return schemas.result?.safeParseAsync(data);
  }

  return data;
};
