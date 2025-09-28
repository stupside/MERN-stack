import type { Request, Response } from "express";

interface User {
  id: string;
  name: string;
}

interface Connection {
  user: User;
  response: Response;
  owner: boolean;
  activity: number;
}


interface Config {
  heartbeat: number;
  timeout: number;
}

class Room {
  private connections: Connection[] = [];
  private interval?: NodeJS.Timeout;

  constructor(
    private readonly id: string,
    private readonly config: Config
  ) { }

  join(user: User, response: Response, owner = false): () => void {
    const connection = { user, response, owner, activity: Date.now() };
    this.connections.push(connection);
    this.start();

    this.emit("room:join", { user, timestamp: Date.now() });
    return () => this.leave(connection);
  }

  leave(target: Connection): void {
    this.connections = this.connections.filter(conn => conn !== target);
    this.emit("room:leave", { user: target.user, timestamp: Date.now() });

    if (this.connections.length === 0) {
      this.destroy();
    }
  }

  broadcast<T>(event: T): void {
    const failed: Connection[] = [];

    for (const conn of this.connections) {
      if (!this.write(conn, event)) {
        failed.push(conn);
      }
    }

    for (const conn of failed) {
      this.leave(conn);
    }
  }


  private start(): void {
    if (!this.interval) {
      this.interval = setInterval(() => this.tick(), this.config.heartbeat);
    }
  }

  private tick(): void {
    this.cleanup(Date.now());
  }

  private cleanup(now: number): void {
    const stale = this.connections.filter(
      conn => now - conn.activity > this.config.timeout
    );

    for (const conn of stale) {
      console.log(`Stale connection: ${conn.user.id} in room ${this.id}`);
      this.leave(conn);
    }
  }

  private emit<T>(type: string, data: T): void {
    this.broadcast({ type, ...data });
  }

  private write<T>(connection: Connection, event: T): boolean {
    try {
      if (connection.response.destroyed || connection.response.writableEnded) {
        return false;
      }

      connection.response.write(`data: ${JSON.stringify(event)}\n\n`);
      connection.activity = Date.now();
      return true;
    } catch {
      return false;
    }
  }

  private destroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log(`Room destroyed: ${this.id}`);
  }
}

class Manager {
  private rooms = new Map<string, Room>();
  private readonly config: Config = {
    timeout: 30000,
    heartbeat: 3000,
  };

  headers(request: Request, response: Response): void {
    response.setHeader("Connection", "keep-alive");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Headers", "Cache-Control");

    const origin = request.headers.origin;
    if (origin) {
      response.setHeader("Access-Control-Allow-Origin", origin);
    }
  }

  connect(roomId: string, user: User, response: Response, owner = false): () => void {
    const room = this.room(roomId);
    const cleanup = room.join(user, response, owner);

    return () => {
      cleanup();
    };
  }






  broadcast<T>(roomId: string, event: T): void {
    this.rooms.get(roomId)?.broadcast(event);
  }

  private room(id: string): Room {
    let room = this.rooms.get(id);
    if (!room) {
      room = new Room(id, this.config);
      this.rooms.set(id, room);
    }
    return room;
  }
}

export const manager = new Manager();