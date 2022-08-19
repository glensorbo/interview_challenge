export const Spinner = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <span className='text-primary font-bold tracking-wide text-2xl mb-4'>Loading...</span>
      <div className='spinner'></div>
    </div>
  );
};
