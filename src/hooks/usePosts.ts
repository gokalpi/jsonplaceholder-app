import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { API_URL, fetcher } from '@/lib/api';
import { Comment, Post, User } from '@/types';

const PAGE_SIZE = 6;

export default function usePosts() {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${API_URL}/posts?_page=${index + 1}&_limit=${PAGE_SIZE}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const posts: Post[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const { data: users, error: usersError } = useSWR<User[]>(
    `${API_URL}/users`,
    fetcher
  );

  const { data: comments, error: commentsError } = useSWR<Comment[]>(
    `${API_URL}/comments`,
    fetcher
  );

  const postsWithDetails: Post[] = posts.map((post: Post) => {
    return {
      ...post,
      user: users?.find((user) => user.id === post.userId),
      comments: comments?.filter((comment) => comment.postId === post.id),
    };
  });

  return {
    posts: postsWithDetails,
    error: error || usersError,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  };
}
