import { io } from 'socket.io-client';

import { backendSocketUri } from './lib/api';

import { UserList } from './components/UserList';
import { ChatWindow } from './components/ChatWindow';

const socket = io(backendSocketUri);

socket.on('connect', () => {
  console.log("We've opened a websocket connection with id: ", socket.id);
});

export const App = () => {
  return (
    <div className='flex h-screen'>
      <UserList />
      <main className='w-full'>
        <section className='flex flex-col w-full h-full p-4'>
          <ChatWindow />
          <div className='w-full bg-primary text-white p-6 text-lg'>asdasd</div>
        </section>
      </main>
    </div>
  );
};
