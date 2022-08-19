import { useStateSelector } from '../hooks';

export const ChatWindow = () => {
  const { messages } = useStateSelector((state) => state.chat);

  const reduced = messages.slice(messages.length - 10, messages.length);

  const { current } = useStateSelector((state) => state.users);

  return (
    <ul className='w-full h-full overflow-y-scroll scrollbar scrollbar-thumb-secondary scrollbar-track-primary'>
      {reduced.map((message: { _id: string; message: string; name: string; avatar: string }) => (
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
              <img src={message.avatar} alt={message.name} className='w-10 h-10' />
              <div className='flex flex-col ml-2 h-full w-full'>
                <p className='font-semibold'>{message.name} sier:</p>
                <p className='w-full break-words'>{message.message}</p>
              </div>
            </>
          )}
          {message.name === current.name && (
            <>
              <div className='flex flex-col items-end mr-2 h-full w-full'>
                <p className='font-semibold'>{message.name}</p>
                <p className='break-words'>{message.message}</p>
              </div>
              <img src={message.avatar} alt={message.name} className='w-10 h-10' />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
