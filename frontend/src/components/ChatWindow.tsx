import { useStateSelector } from '../hooks';

export const ChatWindow = () => {
  const { messages } = useStateSelector((state) => state.chat);
  const reduced = messages.slice(0, 9);
  return (
    <ul className='w-full h-full'>
      {reduced.map(
        (message: {
          _id: string;
          message: string;
          name: string;
          avatar: string;
        }) => (
          <li key={message._id} className='flex'>
            <img src={message.avatar} alt={message.name} className='w-5 h-5' />
            {message.name}: {message.message}
          </li>
        )
      )}
    </ul>
  );
};
