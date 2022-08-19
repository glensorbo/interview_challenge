import { useEffect } from 'react';
import { useStateDispatch, useStateSelector } from '../hooks';
import { getUsersInChat } from '../services';

export const UserList = () => {
  const { chatters } = useStateSelector((state) => state.users);

  const dispatch = useStateDispatch();

  useEffect(() => {
    dispatch(getUsersInChat());
  }, [dispatch]);

  return (
    <aside className='w-1/4 max-w-xs min-w-fit border-r-2 border-secondary p-4 mb-4 overflow-y-scroll scrollbar scrollbar-thumb-secondary scrollbar-track-primary'>
      <ul className='w-full h-full'>
        {chatters.map((chatter: { _id: string; name: string; avatar: string }) => (
          <li key={chatter._id} className='flex bg-primary-tinted text-white p-3 mb-3 rounded mr-4'>
            <img src={chatter.avatar} alt={chatter.name} className='w-7 mr-3' />
            <p className='font-semibold tracking-wide'>{chatter.name}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};
