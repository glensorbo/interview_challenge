import { savePublicChat } from './chat';
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
      origin: ['http://localhost:3000', 'https://bouvet-rtc.glensorbo.com'],
    },
  });

  io.socketsJoin('public');

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
    //@ts-ignore
    await UserRepository.save({
      //@ts-ignore
      name: socket.username,
      socket_id: socket.id,
      //@ts-ignore
      avatar: socket.avatar,
    });

    const users = await UserRepository.getAll();

    //@ts-ignore
    io.emit('new-chatter', users);

    //@ts-ignore
    socket.on('status-update', async (socket_id: string, status: string) => {
      await UserRepository.updateUserStatus(socket_id, status);
      const users = await UserRepository.getAll();
      //@ts-ignore
      io.emit('update-userlist', users);
    });

    socket.on(
      //@ts-ignore
      'chat',
      (chat: IChat) => {
        savePublicChat(chat, (newChatMessage: IChat) => {
          if (newChatMessage.message === '') return;
          //@ts-ignore
          io.emit('public-chat', newChatMessage);
        });
      }
    );

    socket.on('disconnect', async (reason) => {
      await UserRepository.deleteUser(socket.id);
      //@ts-ignore
      io.emit('public-user-leave', socket.id);
    });
    socket.on('error', (err) => {
      console.log(err);
    });
  });
};
