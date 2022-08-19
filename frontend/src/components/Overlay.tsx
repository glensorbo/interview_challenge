type Props = {
  children?: React.ReactNode;
};

export const Overlay = (props: Props) => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-primary-tinted'>
      {props.children}
    </div>
  );
};
