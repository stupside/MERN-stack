import { jwtVerify, SignJWT } from "jose";

import z from "zod";

const payloadSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type JwtPayload = z.infer<typeof payloadSchema>;

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  const jwt = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );
  return payloadSchema.parseAsync(jwt.payload);
};

export const generateToken = async (user: {
  id: string;
  name: string;
}): Promise<string> => {
  const now = new Date();

  const payload: JwtPayload = {
    user: {
      id: user.id,
      name: user.name,
    },
  };

  const token = await new SignJWT(payload)
    .setNotBefore(now)
    .setExpirationTime(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) // 7 days
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return token;
};
