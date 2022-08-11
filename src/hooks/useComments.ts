import useSWRInfinite from 'swr/infinite';

import { API_URL, fetcher } from '@/lib/api';
import { Comment } from '@/types';

const PAGE_SIZE = 3;

export default function useComments(postId: number) {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${API_URL}/posts/${postId}/comments?_page=${
        index + 1
      }&_limit=${PAGE_SIZE}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const comments: Comment[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return {
    comments,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  };
}
