import UserCard from './user-card';
import useUsers from '@/hooks/useUsers';

export default function UserList() {
  const { users, error, isLoadingMore, size, setSize, isReachingEnd } =
    useUsers();

  if (error) return <h1>Something went wrong!</h1>;

  if (!users) return <h1>Loading..</h1>;

  return (
    <>
      <div className='mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-5'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className='mt-10 text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
        <button
          className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          aria-label='Load more button'
        >
          {isLoadingMore && (
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          )}

          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
            ? 'No more users'
            : 'Load more users'}
        </button>
      </div>
    </>
  );
}
