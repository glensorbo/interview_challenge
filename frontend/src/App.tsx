import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { useStateDispatch, useStateSelector } from './hooks';
import { getAllNames, getChatHistory } from './services';

import { userActions } from './store/slices/user.slice';

import { backendSocketUri } from './lib/api';

import { UserList } from './components/UserList';
import { ChatWindow } from './components/ChatWindow';
import { Overlay } from './components/Overlay';
import { Modal } from './components/Modal';
import { ChatIdentity } from './components/ChatIdentity';
import { ChatInput } from './components/ChatInput';

export const App = () => {
  const [name, setName] = useState<string | null>(null);

  const { loading } = useStateSelector((state) => state.names);

  const dispatch = useStateDispatch();

  const nameChangeHandler = (
    firstName: string,
    lastName: string,
    avatar: string
  ) => {
    const socket = io(backendSocketUri, {
      auth: { name: `${firstName} ${lastName}`, avatar },
    });

    socket.on('connect', () => {
      console.log("We've opened a websocket connection with id: ", socket.id);
      console.log(`And your name is: ${firstName} ${lastName}`);
      socket.emit('chat', {
        room: 'common',
        name: `${firstName} ${lastName}`,
        message: 'a message',
        avatar,
        time: new Date(),
      });
      setName(`${firstName} ${lastName}`);
      socket.on('common-chat', (chat) => {
        console.log(chat);
      });
      socket.on('new-chatter', ({ _id, name, socket_id, avatar }) => {
        dispatch(userActions.addUser({ _id, name, socket_id, avatar }));
      });
    });
  };

  useEffect(() => {
    dispatch(getAllNames());
    dispatch(getChatHistory());
  }, [dispatch]);

  const onSubmitHandler = (
    e: React.ChangeEvent<HTMLFormElement>,
    text: string
  ) => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <div className='flex h-screen'>
      <UserList />
      <main className='w-full'>
        <section className='flex flex-col w-full h-full p-4'>
          {!name && (
            <Overlay>
              <Modal>
                {!loading && (
                  <ChatIdentity nameChangeHandler={nameChangeHandler} />
                )}
              </Modal>
            </Overlay>
          )}
          <ChatWindow />
          <ChatInput onSubmitHandler={onSubmitHandler} />
        </section>
      </main>
    </div>
  );
};
