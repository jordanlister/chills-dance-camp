import { io, Socket } from 'socket.io-client';
import { WebSocketEvents } from '../types';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;

  connect(token: string) {
    if (this.socket?.connected) return;

    const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';
    
    this.socket = io(WS_URL, {
      auth: {
        token,
      },
      transports: ['websocket'],
      timeout: 10000,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        this.handleReconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.socket?.connect();
      }, this.reconnectInterval * this.reconnectAttempts);
    }
  }

  // Event emitters
  emit<K extends keyof WebSocketEvents>(event: K, data: WebSocketEvents[K]) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  // Event listeners
  on<K extends keyof WebSocketEvents>(
    event: K,
    callback: (data: WebSocketEvents[K]) => void
  ) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off<K extends keyof WebSocketEvents>(
    event: K,
    callback?: (data: WebSocketEvents[K]) => void
  ) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Specific event methods
  onRSVPUpdate(callback: (data: WebSocketEvents['rsvp:update']) => void) {
    this.on('rsvp:update', callback);
  }

  onClassUpdate(callback: (data: WebSocketEvents['class:update']) => void) {
    this.on('class:update', callback);
  }

  onAnnouncement(callback: (data: WebSocketEvents['announcement']) => void) {
    this.on('announcement', callback);
  }

  onUserStatus(callback: (data: WebSocketEvents['user:status']) => void) {
    this.on('user:status', callback);
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const websocketService = new WebSocketService();
export default websocketService;