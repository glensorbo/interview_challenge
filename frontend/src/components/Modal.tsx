type Props = {
  children?: React.ReactNode;
};

export const Modal = (props: Props) => {
  return (
    <section className='h-full flex items-center justify-center'>
      <div className='bg-secondary h-3/5 w-3/5 2xl:w-2/5 max-w-3xl'>
        <div className='h-full w-full flex flex-col p-10 relative items-center'>
          {props.children}
        </div>
      </div>
    </section>
  );
};
