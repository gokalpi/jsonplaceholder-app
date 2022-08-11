import { ChatIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/types';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <div className='prose prose-sm md:prose-md lg:prose-lg dark:prose-invert flex flex-col rounded-lg shadow-lg overflow-hidden'>
      <div className='h-60 relative'>
        <Image
          src={`/assets/images/post-images/thumbnails/${post.id}.jpg`}
          layout='fill'
          objectFit='cover'
          alt=''
          priority={true}
        />
      </div>
      <div className='flex-1 bg-white dark:bg-slate-800 p-6 flex flex-col justify-between'>
        <div className='flex-1'>
          <Link href={`/posts/${post.id}`}>
            <a className='block mt-2 no-underline'>
              <h2 className='hover:underline text-xl'>{post.title}</h2>
              <p className='mt-3 line-clamp-2 md:line-clamp-none'>
                {post.body}
              </p>
            </a>
          </Link>
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='relative h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16'>
              <Link href={`/users/${post.userId}`}>
                <a className='no-underline'>
                  <span className='sr-only'>{post.user?.name}</span>
                  <Image
                    className='rounded-full'
                    src={`/assets/images/profile/${post.userId}.jpg`}
                    alt={post.user?.name}
                    layout='fill'
                  />
                </a>
              </Link>
            </div>
            <div className='ml-3'>
              <p className='prose-sm'>
                <Link href={`/users/${post.userId}`}>
                  <a className='no-underline hover:underline'>
                    {post.user?.name}
                  </a>
                </Link>
              </p>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <p>{post.comments?.length}</p>
            <ChatIcon className='w-5 h-5 ml-1' />
          </div>
        </div>
      </div>
    </div>
  );
}
