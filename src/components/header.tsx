import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitcher from './theme-switcher';

const navigation = [
  { name: 'Posts', href: '/posts' },
  { name: 'Users', href: '/users' },
  { name: 'Albums', href: '/albums' },
];

export default function Header() {
  return (
    <Popover
      as='header'
      className='z-30 sticky top-0 bg-slate-50/95 dark:bg-slate-900/95'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link href='/'>
              <a>
                <span className='sr-only'>Posts</span>
                <div className='relative w-8 h-8 md:w-12 md:h-12'>
                  <Image src='/assets/images/logo.svg' layout='fill' alt='' />
                </div>
              </a>
            </Link>
          </div>

          <div className='md:hidden flex items-center'>
            <div className='mr-2 inline-flex justify-center items-center'>
              {/* Theme Switcher (Dark / light mode) */}
              <ThemeSwitcher />
            </div>

            <div className='-mr-2 -my-2'>
              <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
          </div>

          <div className='hidden prose prose-sm md:prose-md lg:prose-lg dark:prose-invert md:flex space-x-10'>
            {navigation.map((item, index) => (
              <Link key={index} href={item.href}>
                <a className='no-underline'>{item.name}</a>
              </Link>
            ))}

            {/* Theme Switcher (Dark / light mode) */}
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-150 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden'
        >
          <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
            <div className='px-5 pt-4 flex items-center justify-between'>
              <div className='relative w-8 h-8 md:w-12 md:h-12'>
                <Image src='/assets/images/logo.svg' layout='fill' alt='' />
              </div>
              <div className='-mr-2'>
                <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600'>
                  <span className='sr-only'>Close menu</span>
                  <XIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
            </div>
            <div className='pt-5 pb-6'>
              <div className='px-2 space-y-1'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
