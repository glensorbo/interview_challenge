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
    websocket.socket = io(backendSocketUri, {
      auth: { name: `${firstName} ${lastName}`, avatar },
    });
  },
  getInstance: () => {
    if (websocket.socket) {
      return websocket.socket;
    }
    return null;
  },
};
