import { useStateSelector } from '../hooks';

export const ChatWindow = () => {
  const { messages } = useStateSelector((state) => state.chat);
  console.log(messages);
  return (
    <ul className='w-full h-full'>
      {messages.map(
        (message: { _id: string; message: string; name: string }) => (
          <li key={message._id}>
            {message.name}: {message.message}
          </li>
        )
      )}
    </ul>
  );
};
