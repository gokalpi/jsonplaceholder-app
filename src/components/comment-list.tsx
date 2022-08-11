import useComments from '@/hooks/useComments';
import { Comment } from '@/types';
import Link from 'next/link';

type Props = {
  postId: number;
};

export default function CommentList({ postId }: Props) {
  const { comments, error, isLoadingMore, size, setSize, isReachingEnd } =
    useComments(postId);

  if (error) return <h1>Something went wrong!</h1>;

  if (!comments) return <h1>Loading..</h1>;

  return (
    <>
      <div className='mt-12 mx-auto max-w-md px-4 sm:max-w-lg sm:px-6 lg:px-8 lg:max-w-7xl'>
        {comments.map((comment: Comment, index) => (
          <div
            className='flex flex-col mb-6 prose prose-sm md:prose-md lg:prose-lg dark:prose-invert'
            key={index}
          >
            <Link href={`mailto://${comment.email}`}>
              <a className='prose-lg no-underline hover:underline'>
                {comment.name}
              </a>
            </Link>
            <blockquote className='prose-sm'>{comment.body}</blockquote>
          </div>
        ))}
      </div>
      <div className='mt-10 text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
        <button
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          aria-label='Load more button'
        >
          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
            ? 'No more comments'
            : 'Load more comments'}
        </button>
      </div>
    </>
  );
}
