import { readFile } from "node:fs/promises";
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";
import { logger } from "./logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({
  debug: true,
});

const PORT = process.env.PORT;

type UserID = string;

type User = {
  name: string;
};

const users = new Map<UserID, User>();

users.set("1", { name: "John Doe" });
users.set("2", { name: "Jane Doe" });

// GET /api/users
const listUsers = async (
  _: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  res.setHeader("Content-Type", "application/json");
  return res.end(
    JSON.stringify({
      users: Array.from(users.entries()),
    }),
  );
};

// POST /api/users
const createUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const uuid = crypto.randomUUID();
    try {
      res.setHeader("Content-Type", "application/json");
      users.set(uuid, JSON.parse(body));
      res.end(JSON.stringify({ id: uuid.toString() }));
    } catch {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Invalid request body" }));
    }
  });
  return res;
};

// GET /api/users/:id
const getUserById = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const id = req.url?.split("/").pop();
  if (!id) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ message: "Invalid user ID" }));
  }
  const user = users.get(id);
  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "User not found" }));
  }
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ id, ...user }));
};

// DELETE /api/users/:id
const deleteUserById = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const id = req.url?.split("/").pop();
  if (!id) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ message: "Invalid user ID" }));
  }
  const user = users.get(id);
  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "User not found" }));
  }
  users.delete(id);
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ message: "User deleted" }));
};

const server = createServer((req, res) => {
  logger(req, res, async () => {
    if (req.url === "/") {
      res.setHeader("Content-Type", "text/html");
      return res.end(
        await readFile(join(__dirname, "static", "index.html"), "utf-8"),
      );
    }

    if (req.url?.startsWith("/api/users")) {
      switch (req.method) {
        case "GET": {
          if (req.url?.includes("/api/users/")) {
            return getUserById(req, res);
          }
          return listUsers(req, res);
        }
        case "POST": {
          return createUser(req, res);
        }
        case "DELETE": {
          if (req.url?.includes("/api/users/")) {
            return deleteUserById(req, res);
          }
        }
      }
    }

    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({
        message: "Hello!",
        req: {
          url: req.url,
          method: req.method,
        },
      }),
    );
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
