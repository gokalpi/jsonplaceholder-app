import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { Post, User } from '@/types';
import Layout from '@/components/layout';
import { API_URL, fetcher } from '@/lib/api';
import CommentList from '@/components/comment-list';
import Link from 'next/link';

type PostDetailsPageProps = {
  post: Post;
};

export default function PostDetailsPage({ post }: PostDetailsPageProps) {
  return (
    <Layout title={post.title}>
      <div className='container px-5 sm:px-0 py-6 mx-auto flex flex-col'>
        <div className='relative h-64'>
          <Image
            className='rounded-lg'
            src={`/assets/images/post-images/${post.id}.jpg`}
            layout='fill'
            objectFit='cover'
            alt=''
          />
        </div>
        <div className='flex flex-col sm:flex-row mt-10'>
          <div className='sm:w-1/3 text-center sm:pr-8 sm:py-8'>
            <div className='relative w-20 h-20 lg:w-36 lg:h-36 inline-flex items-center justify-center'>
              <Image
                className='rounded-full'
                src={`/assets/images/profile/${post.user?.id}.jpg`}
                alt={post.user?.name}
                layout='fill'
              />
            </div>
            <div className='flex flex-col items-center text-center justify-center prose prose-sm md:prose-md lg:prose-lg dark:prose-invert '>
              <Link href={`/users/${post.userId}`}>
                <a className='no-underline hover:underline'>
                  <h4>{post.user?.name}</h4>
                </a>
              </Link>
              <div className='w-12 h-1 bg-blue-500 rounded mt-2 mb-4'></div>
            </div>
          </div>
          <div className='prose prose-sm md:prose-md lg:prose-lg dark:prose-invert sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className='border-t border-gray-300'>
              <h4>Comments</h4>
              <CommentList postId={post.id} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  let post: Post = await fetcher(`${API_URL}/posts/${id}`);

  if (!Object.keys(post).length) {
    return {
      notFound: true,
    };
  }

  post.user = await fetcher(`${API_URL}/users/${post.userId}`);

  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await fetcher(`${API_URL}/posts`);

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
