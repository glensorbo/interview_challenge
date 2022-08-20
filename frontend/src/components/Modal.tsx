type Props = {
  children?: React.ReactNode;
};

export const Modal = (props: Props) => {
  return (
    <section className='h-full flex items-center justify-center z-10'>
      <div className='bg-secondary h-full sm:h-4/5 w-full sm:w-2/5 min-h-fit min-w-fit rounded'>
        <div className='h-full w-full flex flex-col p-10 relative items-center'>
          {props.children}
        </div>
      </div>
    </section>
  );
};
