export default function Footer() {
  return (
    <footer>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='border-t border-gray-200 py-4 lg:py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='prose prose-sm md:prose-md lg:prose-lg dark:prose-invert max-w-none text-center'>
            &copy; 2022 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
