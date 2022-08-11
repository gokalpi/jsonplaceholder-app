import { Tab } from '@headlessui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import classNames from 'classnames';

import { User } from '@/types';
import Layout from '@/components/layout';
import { API_URL, fetcher } from '@/lib/api';
import Link from 'next/link';

type Props = {
  user: User;
};

export default function UserDetailsPage({ user }: Props) {
  const tabs = [
    { name: 'User Info' },
    { name: 'Posts', count: user.posts?.length },
    { name: 'Albums', count: user.albums?.length },
    { name: 'Todos', count: user.todos?.length },
  ];

  return (
    <Layout title={`Profile of ${user.name}`}>
      <div className='container py-6 mx-auto'>
        <div className='flex flex-col sm:flex-row mt-10'>
          <div className='sm:w-1/3 text-center sm:pr-8 sm:py-8'>
            <div className='relative w-20 h-20 lg:w-36 lg:h-36 inline-flex items-center justify-center'>
              <Image
                className='rounded-full'
                src={`/assets/images/profile/${user.id}.jpg`}
                alt={user.name}
                layout='fill'
              />
            </div>
            <div className='flex flex-col items-center text-center justify-center prose prose-sm md:prose-md lg:prose-lg dark:prose-invert'>
              <h4 className='mt-4'>{user.name}</h4>
              <div className='w-12 h-1 bg-blue-500 rounded mt-2 mb-4'></div>
            </div>
          </div>
          <div className='w-full'>
            <Tab.Group>
              <Tab.List className='flex space-x-1 border-b border-gray-200 prose prose-md dark:prose-invert max-w-none'>
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        'w-full whitespace-nowrap py-2.5 leading-5 border-b-2 no-underline focus:outline-none',
                        selected
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent hover:text-gray-700 hover:border-gray-200'
                      )
                    }
                  >
                    {tab.name}
                    {tab.count ? (
                      <span className='hidden ml-3 py-0.5 px-2.5 rounded-full prose-sm md:inline-block items-center justify-center bg-blue-100 text-gray-600'>
                        {tab.count}
                      </span>
                    ) : null}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className='rounded-b-xl bg-white dark:bg-slate-800 prose prose-md dark:prose-invert max-w-none p-5'>
                  <dl>
                    <div className='bg-gray-100 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt>Full name</dt>
                      <dd className='mt-1 sm:mt-0 sm:col-span-2'>
                        {user.name}
                      </dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt>User name</dt>
                      <dd className='mt-1 sm:mt-0 sm:col-span-2'>
                        {user.username}
                      </dd>
                    </div>
                    <div className='bg-gray-100 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt>Email address</dt>
                      <dd className='mt-1 sm:mt-0 sm:col-span-2'>
                        <Link href={`mailto://${user.email}`}>
                          <a className='no-underline'>{user.email}</a>
                        </Link>
                      </dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt>Address</dt>
                      <dd className='mt-1 sm:mt-0 sm:col-span-2'>
                        {user.address.street} {user.address.suite}
                        <br />
                        {user.address.city}
                        <br />
                        {user.address.zipcode}
                      </dd>
                    </div>
                    <div className='bg-gray-100 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt>Phone</dt>
                      <dd className='mt-1 sm:mt-0 sm:col-span-2'>
                        <Link href={`tel://${user.phone}`}>
                          <a className='no-underline'>{user.phone}</a>
                        </Link>
                      </dd>
                    </div>
                    <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt>Web site</dt>
                      <dd className='mt-1 sm:mt-0 sm:col-span-2'>
                        <Link href={`https://${user.website}`}>
                          <a className='no-underline'>{user.website}</a>
                        </Link>
                      </dd>
                    </div>
                    <div className='bg-gray-100 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt>Company</dt>
                      <dd className='mt-1 sm:mt-0 sm:col-span-2'>
                        <span className='font-semibold'>
                          {user.company.name}
                        </span>
                        <br />
                        <span>{user.company.catchPhrase}</span>
                        <br />
                        <span>{user.company.bs}</span>
                      </dd>
                    </div>
                  </dl>
                </Tab.Panel>
                <Tab.Panel className='rounded-b-xl bg-white dark:bg-slate-800 prose prose-md dark:prose-invert max-w-none p-5'>
                  {user.posts?.map((post) => (
                    <article key={post.id}>
                      <h3>{post.title}</h3>
                      <p className='mb-3 line-clamp-3 md:line-clamp-none'>
                        {post.body}
                      </p>
                    </article>
                  ))}
                </Tab.Panel>
                <Tab.Panel className='rounded-b-xl bg-white dark:bg-slate-800 prose prose-md dark:prose-invert max-w-none p-5'>
                  {user.albums?.map((album) => (
                    <article key={album.id}>
                      <h3>{album.title}</h3>
                      <p className='mt-3'>{album.photos?.length} photos</p>
                    </article>
                  ))}
                </Tab.Panel>
                <Tab.Panel className='rounded-b-xl bg-white dark:bg-slate-800 prose prose-md dark:prose-invert max-w-none p-5'>
                  <fieldset className='prose prose-md dark:prose-invert'>
                    <legend className='sr-only'>Todos</legend>
                    {user.todos?.map((todo) => (
                      <div key={todo.id} className='flex items-center mb-4'>
                        <input
                          id={`todo-${todo.id}`}
                          name={`todo-${todo.id}`}
                          type='checkbox'
                          className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                          checked={todo.completed}
                          readOnly
                        />
                        <label htmlFor={`todo-${todo.id}`} className='ml-3'>
                          {todo.title}
                        </label>
                      </div>
                    ))}
                  </fieldset>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  let user: User = await fetcher(`${API_URL}/users/${id}`);

  if (!Object.keys(user).length) {
    return {
      notFound: true,
    };
  }

  user.posts = await fetcher(`${API_URL}/users/${id}/posts`);

  user.albums = await fetcher(`${API_URL}/users/${id}/albums`);

  user.todos = await fetcher(`${API_URL}/users/${id}/todos`);

  return { props: { user } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users: User[] = await fetcher(`${API_URL}/users`);

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};
