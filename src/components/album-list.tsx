import Image from 'next/image';
import Link from 'next/link';

import useAlbums from '@/hooks/useAlbums';

export default function AlbumList() {
  const { albums, error, isLoadingMore, size, setSize, isReachingEnd } =
    useAlbums();

  if (error) return <h1>Something went wrong!</h1>;

  if (!albums) return <h1>Loading..</h1>;

  return (
    <>
      <ul
        role='list'
        className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'
      >
        {albums.map((album, index) => (
          <li key={index} className='relative'>
            <span className='sr-only'>{album.photos?.[0].thumbnailUrl}</span>
            <Link href={`/albums/${album.id}`}>
              <a className='no-underline'>
                <div className='group relative drop-shadow-md h-20 w-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 mx-auto'>
                  <Image
                    className='rounded-lg'
                    src={
                      album.photos?.[0].thumbnailUrl ||
                      '/assets/images/placeholder.jpg'
                    }
                    alt=''
                    layout='fill'
                  />
                </div>

                <div className='prose prose-sm md:prose-md lg:prose-lg dark:prose-invert text-center'>
                  <p className='mt-4 block truncate pointer-events-none'>
                    {album.title}
                  </p>
                  <p className='block pointer-events-none prose-sm'>
                    {album.user?.name}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>

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
            ? 'No more albums'
            : 'Load more albums'}
        </button>
      </div>
    </>
  );
}
