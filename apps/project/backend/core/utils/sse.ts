import type { Request, Response } from "express";

interface User {
  id: string;
  name: string;
}

interface Connection {
  readonly user: User;
  readonly owner: boolean;
  readonly response: Response;
  activity: number;
}

interface SSEEvent {
  type: string;
  timestamp: number;
  [key: string]: unknown;
}

interface RoomConfig {
  readonly heartbeat: number;
  readonly timeout: number;
}

class ConnectionManager {
  private connections: Connection[] = [];

  add(user: User, response: Response, owner: boolean): Connection {
    const connection: Connection = {
      user,
      response,
      owner,
      activity: Date.now(),
    };
    this.connections.push(connection);
    return connection;
  }

  remove(target: Connection): void {
    this.connections = this.connections.filter(conn => conn !== target);
  }

  getAll(): readonly Connection[] {
    return this.connections;
  }

  getAllUsers(): User[] {
    return this.connections.map(conn => conn.user);
  }

  getStaleConnections(timeout: number): Connection[] {
    const now = Date.now();
    return this.connections.filter(conn => now - conn.activity > timeout);
  }

  isEmpty(): boolean {
    return this.connections.length === 0;
  }
}

class EventBroadcaster {
  constructor(private connectionManager: ConnectionManager) { }

  sendToConnection(connection: Connection, event: SSEEvent): boolean {
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

  broadcastToAll(event: SSEEvent): Connection[] {
    const failedConnections: Connection[] = [];

    for (const connection of this.connectionManager.getAll()) {
      if (!this.sendToConnection(connection, event)) {
        failedConnections.push(connection);
      }
    }

    return failedConnections;
  }

  broadcastToOthers(excludeConnection: Connection, event: SSEEvent): Connection[] {
    const failedConnections: Connection[] = [];

    for (const connection of this.connectionManager.getAll()) {
      if (connection !== excludeConnection && !this.sendToConnection(connection, event)) {
        failedConnections.push(connection);
      }
    }

    return failedConnections;
  }
}

class Room {
  private readonly connectionManager = new ConnectionManager();
  private readonly broadcaster = new EventBroadcaster(this.connectionManager);
  private cleanupInterval?: NodeJS.Timeout;
  private watching: {
    movie: { id: number; title: string | null; poster: string | null };
    initiator: User;
    timestamp: number;
  } | null = null;

  constructor(
    private readonly id: string,
    private readonly config: RoomConfig,
    private readonly onDestroy: (roomId: string) => void
  ) { }

  join(user: User, response: Response, owner = false): () => void {
    const connection = this.connectionManager.add(user, response, owner);
    this.startCleanupIfNeeded();

    // Send current room state to new connection
    this.broadcaster.sendToConnection(connection, {
      type: "room:state",
      users: this.connectionManager.getAllUsers(),
      watching: this.watching,
      timestamp: Date.now(),
    });

    // Notify others about new user
    const failedConnections = this.broadcaster.broadcastToOthers(connection, {
      type: "room:join",
      user,
      timestamp: Date.now(),
    });

    this.handleFailedConnections(failedConnections);

    return () => this.leave(connection);
  }

  leave(connection: Connection): void {
    this.connectionManager.remove(connection);

    // Clear watching state if the initiator is leaving
    if (this.watching && this.watching.initiator.id === connection.user.id) {
      this.clearWatching();
    }

    // Notify remaining users
    const failedConnections = this.broadcaster.broadcastToAll({
      type: "room:leave",
      user: connection.user,
      timestamp: Date.now(),
    });

    this.handleFailedConnections(failedConnections);

    if (this.connectionManager.isEmpty()) {
      this.destroy();
    }
  }

  broadcast(event: SSEEvent): void {
    const failedConnections = this.broadcaster.broadcastToAll(event);
    this.handleFailedConnections(failedConnections);
  }

  broadcastToOthers(excludeUserId: string, event: SSEEvent): void {
    const excludeConnection = this.connectionManager.getAll().find(conn => conn.user.id === excludeUserId);
    if (excludeConnection) {
      const failedConnections = this.broadcaster.broadcastToOthers(excludeConnection, event);
      this.handleFailedConnections(failedConnections);
    } else {
      // If the excluded user is not found, broadcast to all
      this.broadcast(event);
    }
  }

  setWatching(movie: { id: number; title: string | null; poster: string | null }, initiator: User): void {
    this.watching = {
      movie,
      initiator,
      timestamp: Date.now(),
    };

    // Broadcast updated state to all users
    this.broadcast({
      type: "room:state",
      users: this.connectionManager.getAllUsers(),
      watching: this.watching,
      timestamp: Date.now(),
    });
  }

  clearWatching(): void {
    this.watching = null;

    // Broadcast updated state to all users
    this.broadcast({
      type: "room:state",
      users: this.connectionManager.getAllUsers(),
      watching: this.watching,
      timestamp: Date.now(),
    });
  }

  private startCleanupIfNeeded(): void {
    if (!this.cleanupInterval) {
      this.cleanupInterval = setInterval(() => {
        // Send heartbeat to keep connections alive
        this.sendHeartbeat();
        // Clean up stale connections
        this.cleanupStaleConnections();
      }, this.config.heartbeat);
    }
  }

  private sendHeartbeat(): void {
    // Send a heartbeat event to all connections to keep them alive
    this.broadcast({
      type: "heartbeat",
      timestamp: Date.now(),
    });
  }

  private cleanupStaleConnections(): void {
    const staleConnections = this.connectionManager.getStaleConnections(this.config.timeout);

    for (const connection of staleConnections) {
      console.log(`Removing stale connection: ${connection.user.id} in room ${this.id}`);
      this.leave(connection);
    }
  }

  private handleFailedConnections(failedConnections: Connection[]): void {
    for (const connection of failedConnections) {
      this.leave(connection);
    }
  }

  private destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
    console.log(`Room destroyed: ${this.id}`);
    this.onDestroy(this.id);
  }
}

class SSEManager {
  private readonly rooms = new Map<string, Room>();
  private readonly config: RoomConfig = {
    timeout: 30000,
    heartbeat: 3000,
  };

  setupHeaders(request: Request, response: Response): void {
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
    const room = this.getOrCreateRoom(roomId);
    return room.join(user, response, owner);
  }

  broadcast(roomId: string, event: { type: string;[key: string]: unknown }): void {
    const room = this.rooms.get(roomId);
    if (room) {
      const completeEvent: SSEEvent = {
        ...event,
        timestamp: Date.now(),
      };
      room.broadcast(completeEvent);
    }
  }

  broadcastToOthers(roomId: string, excludeUserId: string, event: { type: string;[key: string]: unknown }): void {
    const room = this.rooms.get(roomId);
    if (room) {
      const completeEvent: SSEEvent = {
        ...event,
        timestamp: Date.now(),
      };
      room.broadcastToOthers(excludeUserId, completeEvent);
    }
  }

  setWatching(roomId: string, movie: { id: number; title: string | null; poster: string | null }, initiator: { id: string; name: string }): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.setWatching(movie, initiator);
    }
  }

  clearWatching(roomId: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.clearWatching();
    }
  }

  private getOrCreateRoom(id: string): Room {
    let room = this.rooms.get(id);
    if (!room) {
      room = new Room(id, this.config, (roomId) => {
        this.rooms.delete(roomId);
      });
      this.rooms.set(id, room);
    }
    return room;
  }
}

export const sseManager = new SSEManager();