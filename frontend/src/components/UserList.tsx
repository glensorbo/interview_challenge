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
    <aside className='w-1/4 max-w-xs border-r-2 border-secondary p-4'>
      <ul className='w-full h-full'>
        {chatters.map(
          (chatter: { _id: string; name: string; avatar: string }) => (
            <li key={chatter._id} className='flex'>
              <img
                src={chatter.avatar}
                alt={chatter.name}
                className='w-5 h-5'
              />
              {chatter.name}
            </li>
          )
        )}
      </ul>
    </aside>
  );
};
