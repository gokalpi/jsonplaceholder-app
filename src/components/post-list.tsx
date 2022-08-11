import PostCard from './post-card';
import usePosts from '@/hooks/usePosts';

export default function PostList() {
  const { posts, error, isLoadingMore, size, setSize, isReachingEnd } =
    usePosts();

  if (error) return <h1>Something went wrong!</h1>;

  if (!posts) return <h1>Loading..</h1>;

  return (
    <>
      <div className='mx-auto px-4 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8'>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
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
            ? 'No more posts'
            : 'Load more posts'}
        </button>
      </div>
    </>
  );
}
