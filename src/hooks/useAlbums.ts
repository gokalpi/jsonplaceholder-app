import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { API_URL, fetcher } from '@/lib/api';
import { Album, Photo, User } from '@/types';

const PAGE_SIZE = 6;

export default function useAlbums() {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${API_URL}/albums?_page=${index + 1}&_limit=${PAGE_SIZE}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const albums: Album[] = data ? [].concat(...data) : [];
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

  const { data: photos, error: photosError } = useSWR<Photo[]>(
    `${API_URL}/photos`,
    fetcher
  );

  const albumsWithDetails: Album[] = albums.map((album: Album) => {
    return {
      ...album,
      user: users?.find((user) => user.id === album.userId),
      photos: photos?.filter((photo) => photo.albumId === album.id),
    };
  });

  return {
    albums: albumsWithDetails,
    error: error || usersError,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  };
}
