import type { Request, Response } from "express";

interface User {
  id: string;
  name: string;
}

interface SSEConnection {
  user: User;
  response: Response;
}

class SSEManager {
  private connections = new Map<string, SSEConnection[]>();

  setupSSEResponse(request: Request, response: Response): void {
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

  addConnection(roomId: string, user: User, response: Response): () => void {
    const connection: SSEConnection = { user, response };
    const room = this.connections.get(roomId) || [];

    room.push(connection);
    this.connections.set(roomId, room);

    // Broadcast user connected
    this.broadcast(roomId, {
      type: "user:connected",
      user
    });

    let cleaned = false;
    return () => {
      if (cleaned) return;
      cleaned = true;

      // Broadcast user disconnected before removing
      this.broadcast(roomId, {
        type: "user:disconnected",
        user
      });

      this.removeConnection(roomId, connection);
    };
  }

  private removeConnection(roomId: string, connection: SSEConnection): void {
    const room = this.connections.get(roomId) || [];
    const filtered = room.filter((c) => c !== connection);

    if (filtered.length === 0) {
      this.connections.delete(roomId);
    } else {
      this.connections.set(roomId, filtered);
    }
  }

  broadcast<T>(roomId: string, event: T): void {
    const room = this.connections.get(roomId) || [];
    const failedConnections: SSEConnection[] = [];

    room.forEach((connection) => {
      try {
        console.log(`Broadcasting to user ${connection.user.id} in room ${roomId}:`, event);
        connection.response.write(`data: ${JSON.stringify(event)}\n\n`);
      } catch {
        console.log(`Failed to send event to user ${connection.user.id} in room ${roomId}`);
        failedConnections.push(connection);
      }
    });

    failedConnections.forEach((connection) => {
      console.log(`Removing failed connection for user ${connection.user.id} in room ${roomId}`);
      this.removeConnection(roomId, connection);
    });
  }

  getConnectedUsers(roomId: string): User[] {
    const room = this.connections.get(roomId) || [];
    const uniqueUsers = new Map<string, User>();

    room.forEach(conn => {
      uniqueUsers.set(conn.user.id, conn.user);
    });

    return Array.from(uniqueUsers.values());
  }
}

export const sseManager = new SSEManager();
