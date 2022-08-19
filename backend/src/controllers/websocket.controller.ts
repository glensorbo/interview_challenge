import { saveCommonchat } from './chat/save-common-chat';
import { Server } from 'socket.io';

import { IChat } from '../types/interfaces/models';
import { UserRepository } from '../repositories';

export const websocketController = (server: any) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: '*',
    },
  });

  io.socketsJoin('common');

  io.use((socket, next) => {
    //@ts-ignore
    socket.username = socket.handshake.auth.name;
    next();
  });

  io.on('connection', (socket) => {
    //@ts-ignore
    console.log('New websocket connection', socket.id, socket.username);
    //@ts-ignore
    UserRepository.save({ name: socket.username, socket_id: socket.id });

    //@ts-ignore
    socket.broadcast.emit('new-chatter', {
      //@ts-ignore
      name: socket.username,
      socket_id: socket.id,
    });

    socket.on(
      //@ts-ignore
      'chat',
      (chat: IChat) => {
        saveCommonchat(chat, (newChatMessage: any) => {
          //@ts-ignore
          socket.broadcast.emit('common-chat', newChatMessage);
        });
      }
    );

    socket.on('disconnect', (reason) => {
      console.log(reason);
      console.log(socket.id);
      UserRepository.deleteUser(socket.id);
    });
  });
};
