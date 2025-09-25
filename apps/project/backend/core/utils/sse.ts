import type { Request, Response } from "express";

interface SSEConnection {
  user: string;
  response: Response;
}

class SSEManager {
  private connections = new Map<string, SSEConnection[]>();

  addConnection(
    roomId: string,
    connection: SSEConnection,
    on?: Partial<{
      connect: () => void;
      disconnect: () => void;
    }>,
  ): () => void {
    const room = this.connections.get(roomId) || [];
    room.push(connection);

    this.connections.set(roomId, room);

    // Broadcast user connected event to other users in the room
    on?.connect?.();

    // Return cleanup function
    return () => {
      this.removeConnection(roomId, connection);
      // Broadcast user disconnected event
      on?.disconnect?.();
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

    room.forEach((connection) => {
      try {
        connection.response.write(`data: ${JSON.stringify(event)}\n\n`);
      } catch {
        this.removeConnection(roomId, connection);
      }
    });
  }

  getConnectedUsers(roomId: string): string[] {
    const room = this.connections.get(roomId) || [];
    return [...new Set(room.map((conn) => conn.user))];
  }

  setupSSEResponse(request: Request, response: Response): void {
    response.setHeader("Connection", "keep-alive");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Headers", "Cache-Control");

    // Allow any origin when credentials are used
    const origin = request.headers.origin;
    if (origin) {
      response.setHeader("Access-Control-Allow-Origin", origin);
    }
  }
}

export const sseManager = new SSEManager();
