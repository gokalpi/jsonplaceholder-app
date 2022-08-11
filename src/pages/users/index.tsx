import Layout from '@/components/layout';
import UserList from '@/components/user-list';

export default function UsersPage() {
  return (
    <Layout title='All Users from jsonplaceholder'>
      <div className='py-4 sm:py-8 lg:py-12'>
        <div className='relative'>
          <div className='prose prose-sm md:prose-md lg:prose-lg dark:prose-invert text-center mx-auto max-w-md px-4 mb-12 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
            <h1>All Users from jsonplaceholder</h1>
          </div>

          <UserList />
        </div>
      </div>
    </Layout>
  );
}
