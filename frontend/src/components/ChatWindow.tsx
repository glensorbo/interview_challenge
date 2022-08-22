import { useEffect, useRef } from 'react';
import { useStateSelector } from '../hooks';

export const ChatWindow = () => {
  const { messages } = useStateSelector((state) => state.chat);

  let reduced;

  if (messages.length > 10) {
    reduced = messages.slice(messages.length - 10, messages.length);
  } else {
    reduced = messages;
  }

  const { current } = useStateSelector((state) => state.users);

  const chatList = useRef(null);

  useEffect(() => {
    if (chatList) {
      //@ts-ignore
      chatList.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  return (
    <ul
      className='w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary border-2 border-secondary mb-4 p-4'
      ref={chatList}
    >
      {reduced.map(
        (message: {
          _id: string;
          message: string;
          name: string;
          time: string;
          avatar: string;
        }) => (
          <li
            key={message._id}
            className={
              message.name !== current.name
                ? 'flex max-w-md bg-primary-tinted text-white px-4 py-2 mb-4 rounded'
                : 'flex max-w-md bg-primary-tinted text-white px-4 py-2 mb-4 rounded ml-auto'
            }
          >
            {message.name !== current.name && (
              <>
                <img
                  src={message.avatar}
                  alt={message.name}
                  className='w-10 h-10'
                />
                <div className='flex flex-col ml-2 h-full w-full'>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>{message.name}</p>
                    <span className='text-xs text-gray-400'>
                      {message.time}
                    </span>
                  </div>
                  <p className='w-full break-words'>{message.message}</p>
                </div>
              </>
            )}
            {message.name === current.name && (
              <>
                <div className='flex flex-col items-end mr-2 h-full w-full'>
                  <div className='w-full flex justify-between'>
                    <span className='text-xs text-gray-400'>
                      {message.time}
                    </span>
                    <p className='font-semibold'>{message.name}</p>
                  </div>
                  <p className='break-words'>{message.message}</p>
                </div>
                <img
                  src={message.avatar}
                  alt={message.name}
                  className='w-10 h-10'
                />
              </>
            )}
          </li>
        )
      )}
    </ul>
  );
};
