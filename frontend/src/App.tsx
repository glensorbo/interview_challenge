import { useEffect, useState } from 'react';

import { websocket } from './lib/socket';

import { useStateDispatch, useStateSelector } from './hooks';
import { getAllNames, getChatHistory } from './services';

import { Chatter, userActions } from './store/slices/user.slice';

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
  const [hasBeenActive, setHasBeenActive] = useState<boolean>(false);

  const { loading } = useStateSelector((state) => state.names);
  const { current } = useStateSelector((state) => state.users);

  const dispatch = useStateDispatch();

  const nameChangeHandler = (firstName: string, lastName: string, avatar: string) => {
    websocket.connect(firstName, lastName, avatar);
    const socket = websocket.getInstance();
    socket?.on('connect', () => {
      setName(`${firstName} ${lastName}`);

      socket?.on('public-chat', (chat) => {
        dispatch(chatActions.addChat(chat));
      });

      socket?.on('new-chatter', (users: Chatter[]) => {
        const mySelf = users.filter((user) => user.socket_id === socket.id);
        const newList = [...users].filter((user) => user.socket_id !== socket.id);
        const sortedList = newList.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        sortedList.unshift(mySelf[0]);
        dispatch(userActions.updateUserList(sortedList));
      });

      socket?.on('public-user-leave', (socket_id) => {
        dispatch(userActions.removeUser(socket_id));
      });

      socket?.on('update-userlist', (users) => {
        const mySelf = users.filter((user: Chatter) => user.socket_id === socket.id);

        const newList = [...users].filter((user) => user.socket_id !== socket.id);

        const sortedList = newList.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        sortedList.unshift(mySelf[0]);
        dispatch(userActions.loadUsers(sortedList));
      });

      dispatch(
        userActions.setCurrentUser({
          name: `${firstName} ${lastName}`,
          avatar,
          socketId: socket?.id,
        })
      );
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

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const socket = websocket.getInstance();

    if (name) {
      timer = setTimeout(() => {
        socket?.emit('status-update', current.socketId, 'AFK');
      }, 300000);
    }

    if (hasBeenActive) {
      //@ts-ignore
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [name, current.socketId, hasBeenActive]);

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
          {name && <ChatInput setHasBeenActive={setHasBeenActive} />}
        </section>
      </main>
    </div>
  );
};
