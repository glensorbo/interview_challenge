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
    <aside className='hidden lg:block lg:w-1/4 max-w-xs min-w-fit border-2 border-l-0  border-secondary p-4 my-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary'>
      <ul className='w-full h-full'>
        {chatters.map(
          (chatter: {
            _id: string;
            name: string;
            avatar: string;
            status: string;
            joined: string;
          }) => (
            <li
              key={chatter._id}
              className='flex bg-primary-tinted text-white p-3 mb-3 rounded mr-4'
            >
              <img
                src={chatter.avatar}
                alt={chatter.name}
                className='w-7 mr-3'
              />
              <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                  <p className='font-semibold tracking-wide'>{chatter.name}</p>
                  <span className='text-xs text-gray-400'>
                    {chatter.joined}
                  </span>
                </div>
                <span className='text-sm tracking-wide text-gray-400'>
                  {chatter.status}..
                </span>
              </div>
            </li>
          )
        )}
      </ul>
    </aside>
  );
};
