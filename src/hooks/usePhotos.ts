import useSWRInfinite from 'swr/infinite';

import { API_URL, fetcher } from '@/lib/api';
import { Photo } from '@/types';

const PAGE_SIZE = 5;

export default function usePhotos(albumId?: number) {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      albumId
        ? `${API_URL}/albums/${albumId}/photos?_page=${
            index + 1
          }&_limit=${PAGE_SIZE}`
        : `${API_URL}/photos?_page=${index + 1}&_limit=${PAGE_SIZE}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const photos: Photo[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return {
    photos: photos,
    error: error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  };
}
