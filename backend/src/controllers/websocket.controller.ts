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
    //@ts-ignore
    socket.avatar = socket.handshake.auth.avatar;
    next();
  });

  io.on('connection', async (socket) => {
    //@ts-ignore
    console.log('New websocket connection', socket.id, socket.username);
    const user = await UserRepository.save({
      //@ts-ignore
      name: socket.username,
      socket_id: socket.id,
      //@ts-ignore
      avatar: socket.avatar,
    });

    //@ts-ignore
    io.emit('new-chatter', {
      _id: user._id,
      //@ts-ignore
      name: socket.username,
      socket_id: socket.id,
      //@ts-ignore
      avatar: socket.avatar,
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

    socket.on('disconnect', async (reason) => {
      console.log(reason);
      console.log(socket.id);
      await UserRepository.deleteUser(socket.id);
    });
  });
};
