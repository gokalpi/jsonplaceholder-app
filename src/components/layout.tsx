import { ReactNode } from 'react';
import Head from 'next/head';

import Header from './header';
import Footer from './footer';

type Props = {
  children: ReactNode;
  title?: string;
};

export default function Layout({ children, title = 'Posts from jsonplaceholder' }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
        />
      </Head>

      <div className='min-h-screen flex flex-col'>
        {/* Header */}
        <Header />

        <main className='flex-grow mx-auto max-w-7xl w-full flex flex-col px-0 sm:px-6 lg:px-8'>
          <div className='flex-shrink-0 min-h-full'>{children}</div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
