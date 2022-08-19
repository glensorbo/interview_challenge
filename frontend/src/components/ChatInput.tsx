import { useState } from 'react';

type Props = {
  children?: React.ReactNode;
  onSubmitHandler: (e: React.ChangeEvent<HTMLFormElement>, text: string) => void;
};

export const ChatInput = (props: Props) => {
  const [text, setText] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <form
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
        props.onSubmitHandler(e, text);
        setText('');
      }}
      className='relative'
    >
      <input
        type='text'
        autoFocus={true}
        value={text}
        onChange={onChangeHandler}
        placeholder='Skriv melding her'
        className='w-full bg-primary text-white p-6 text-lg rounded focus:outline-none pr-28'
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
