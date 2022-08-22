import { io, Socket } from 'socket.io-client';
import { backendSocketUri } from './api';

type Websocket = {
  socket: Socket | null;
  connect: (firstName: string, lastName: string, avatar: string) => void;
  getInstance: () => Socket | null;
};

export const websocket: Websocket = {
  socket: null,
  connect: (firstName: string, lastName: string, avatar: string) => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = `${hours}:${minutes}`;
    websocket.socket = io(backendSocketUri, {
      auth: { name: `${firstName} ${lastName}`, avatar, time },
    });
  },
  getInstance: () => {
    if (websocket.socket) {
      return websocket.socket;
    }
    return null;
  },
};
