import { useEffect, useState } from 'react';

import { websocket } from './lib/socket';

import { useStateDispatch, useStateSelector } from './hooks';
import { getAllNames, getChatHistory, getUsersInChat } from './services';

import { userActions } from './store/slices/user.slice';

import { UserList } from './components/UserList';
import { ChatWindow } from './components/ChatWindow';
import { Overlay } from './components/Overlay';
import { Modal } from './components/Modal';
import { ChatIdentity } from './components/ChatIdentity';
import { ChatInput } from './components/ChatInput';
import { Spinner } from './components/Spinner';
import { chatActions } from './store/slices/chat.slice';

export const App = () => {
  const [name, setName] = useState<string | null>(null);

  const { loading } = useStateSelector((state) => state.names);
  const { current } = useStateSelector((state) => state.users);

  const dispatch = useStateDispatch();

  const nameChangeHandler = (firstName: string, lastName: string, avatar: string) => {
    websocket.connect(firstName, lastName, avatar);
    const socket = websocket.getInstance();
    socket!.on('connect', () => {
      console.log("We've opened a websocket connection with id: ", socket!.id);
      console.log(`And your name is: ${firstName} ${lastName}`);

      setName(`${firstName} ${lastName}`);

      socket!.on('public-chat', (chat) => {
        dispatch(chatActions.addChat(chat));
      });

      socket!.on('new-chatter', ({ _id, name, socket_id, avatar }) => {
        dispatch(userActions.addUser({ _id, name, socket_id, avatar }));
      });

      socket!.on('public-user-leave', (socket_id) => {
        dispatch(userActions.removeUser(socket_id));
      });

      dispatch(getUsersInChat());
      dispatch(userActions.setCurrentUser({ name: `${firstName} ${lastName}`, avatar }));
    });
  };

  useEffect(() => {
    dispatch(getAllNames());
    dispatch(getChatHistory());
    return () => {
      const socket = websocket.getInstance();
      socket?.disconnect();
    };
  }, [dispatch]);

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();
    const socket = websocket.getInstance();
    socket!.emit('chat', {
      room: 'public',
      name: current.name,
      message: text,
      avatar: current.avatar,
      time: new Date(),
    });
  };

  return (
    <div className='flex h-screen'>
      <UserList />
      <main className='w-full'>
        <section className='flex flex-col w-full h-full p-4'>
          {!name && (
            <Overlay>
              <Modal>
                {loading ? <Spinner /> : <ChatIdentity nameChangeHandler={nameChangeHandler} />}
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
