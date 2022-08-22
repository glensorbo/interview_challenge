import { useEffect, useState } from 'react';
import { useStateSelector } from '../hooks';

import { DebounceInput } from 'react-debounce-input';

import { websocket } from '../lib/socket';

type Props = {
  children?: React.ReactNode;
  setHasBeenActive: (a: boolean) => void;
};

export const ChatInput = (props: Props) => {
  const [text, setText] = useState('');
  const [sentChat, setSentChat] = useState(false);

  const { current } = useStateSelector((state) => state.users);

  const socket = websocket.getInstance();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let afkTimer: ReturnType<typeof setTimeout>;

    timer = setTimeout(
      () => {
        socket?.emit('status-update', current.socketId, 'Idle');
      },
      sentChat ? 5000 : 30000
    );

    afkTimer = setTimeout(() => {
      socket?.emit('status-update', current.socketId, 'AFK');
    }, 300000);

    return () => {
      clearTimeout(timer);
      clearTimeout(afkTimer);
    };
  }, [text, socket, current, sentChat]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const socket = websocket.getInstance();
    socket?.emit('status-update', current.socketId, 'Typing');
    setText(e.target.value);
  };

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === '') return;
    setText('');
    setSentChat(true);

    const socket = websocket.getInstance();

    props.setHasBeenActive(true);

    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    socket?.emit('chat', {
      room: 'public',
      name: current.name,
      message: text,
      avatar: current.avatar,
      time: `${hours}:${minutes}`,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className='relative'>
      <DebounceInput
        type='text'
        autoFocus={true}
        value={text}
        onChange={(e) => onChangeHandler(e)}
        debounceTimeout={500}
        placeholder='Skriv melding her'
        className='w-full bg-primary text-white p-3 text-lg rounded focus:outline-none pr-28'
      />
      <button
        type='submit'
        className='absolute top-0 right-0 bg-secondary h-full px-5 text-primary font-bold tracking-wide rounded-r hover:cursor-pointer'
      >
        Send
      </button>
    </form>
  );
};
