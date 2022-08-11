import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { API_URL, fetcher } from '@/lib/api';
import { Post, User } from '@/types';

const PAGE_SIZE = 5;

export default function useUsers() {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${API_URL}/users?_page=${index + 1}&_limit=${PAGE_SIZE}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const users: User[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const { data: posts, error: postsError } = useSWR<Post[]>(
    `${API_URL}/posts`,
    fetcher
  );

  const usersWithDetails: User[] = users.map((user: User) => {
    return {
      ...user,
      posts: posts?.filter((post) => post.userId === user.id),
    };
  });

  return {
    users: usersWithDetails,
    error: error || postsError,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  };
}
