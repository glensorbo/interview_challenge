import { useRandomName } from '../hooks/useRandomName';

type Props = {
  children?: React.ReactNode;
  nameChangeHandler: (firstName: string, lastName: string) => void;
};

export const ChatIdentity = (props: Props) => {
  const { firstName, lastName, sex, randomize } = useRandomName();

  return (
    <>
      <div className='flex items-center'>
        <img
          src='https://avatars.dicebear.com/api/bottts/Bouvet.svg'
          alt='Avatar'
          className='h-16 xl:h-24 w-16 xl:w-24'
        />
        <h1 className='font-bold text-2xl xl:text-3xl text-white ml-5 mt-3 xl:mt-6'>
          Velkommen til Bouvet RTC
        </h1>
      </div>
      <div className='mt-10'>
        <p className='text-white text-2xl py-10 font-bold'>
          Først skal vi velge en chat identitet til deg
        </p>
        <p className='text-white text-2xl py-2 font-semibold tracking-wide'>
          Fornavn: {firstName}
        </p>
        <p className='text-white text-2xl font-semibold tracking-wide'>
          Etternavn: {lastName}
        </p>
      </div>
      <img
        src={`https://avatars.dicebear.com/api/${sex}/${firstName}${lastName}.svg`}
        alt={firstName + ' ' + lastName}
        className='h-56 mt-10'
      />
      <div className='w-full flex items-center justify-around mt-auto'>
        <button
          className='py-3 px-4 bg-primary text-white font-semibold tracking-wide'
          onClick={randomize}
        >
          Jeg vil ha et nytt navn
        </button>
        <button
          className='py-3 px-4 bg-primary text-white font-semibold tracking-wide'
          onClick={() => props.nameChangeHandler(firstName, lastName)}
        >
          Kult navn, ta meg til chatten!
        </button>
      </div>
    </>
  );
};