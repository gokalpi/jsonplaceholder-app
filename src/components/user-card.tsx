import Image from 'next/image';
import Link from 'next/link';

import { User } from '@/types';

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  return (
    <div className='space-y-4 mx-auto'>
      <div className='relative drop-shadow-md h-20 w-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 mx-auto'>
        <Image
          className='rounded-tl-3xl rounded-br-3xl hover:sepia'
          src={`/assets/images/profile/${user.id}.jpg`}
          alt={user?.name}
          layout='fill'
        />
      </div>
      <div className='space-y-2'>
        <div className='prose prose-sm md:prose-md lg:prose-lg dark:prose-invert text-center'>
          <Link href={`/users/${user.id}`}>
            <a className='no-underline hover:underline'>
              <h6>{user.name}</h6>
            </a>
          </Link>
          <p className='text-blue-600'>{user.posts?.length} posts</p>
        </div>
      </div>
    </div>
  );
}
