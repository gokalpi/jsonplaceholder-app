import { GetStaticPaths, GetStaticProps } from 'next';

import { Album } from '@/types';
import { API_URL, fetcher } from '@/lib/api';
import Layout from '@/components/layout';
import PhotoList from '@/components/photo-list';

type Props = {
  album: Album;
};

export default function AlbumDetailsPage({ album }: Props) {
  return (
    <Layout title={`Album - ${album.title}`}>
      <div className='py-4 sm:py-8 lg:py-12'>
        <div className='relative'>
          <div className='prose prose-sm md:prose-md lg:prose-lg dark:prose-invert text-center mx-auto max-w-md px-4 mb-12 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
            <h1>All Photos from Album {album.title}</h1>
          </div>

          <PhotoList albumId={album.id} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  let album: Album = await fetcher(`${API_URL}/albums/${id}`);

  if (!Object.keys(album).length) {
    return {
      notFound: true,
    };
  }

  album.photos = await fetcher(`${API_URL}/albums/${id}/photos`);

  return { props: { album } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const albums: Album[] = await fetcher(`${API_URL}/albums`);

  const paths = albums.map((album: Album) => ({
    params: { id: album.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
