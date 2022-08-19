import { useState } from 'react';

type Props = {
  children?: React.ReactNode;
  onSubmitHandler: (
    e: React.ChangeEvent<HTMLFormElement>,
    text: string
  ) => void;
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
    >
      <input
        type='text'
        autoFocus={true}
        value={text}
        onChange={onChangeHandler}
        placeholder='Skriv melding her'
        className='w-full bg-primary text-white p-6 text-lg rounded'
      />
    </form>
  );
};
