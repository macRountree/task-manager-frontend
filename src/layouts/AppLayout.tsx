import {Logo} from '@/components/Logo';
import {Outlet} from 'react-router-dom';

export const AppLayout = () => {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
        </div>
        <nav></nav>
      </header>
      <section className=" max-w-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          All rights reserved &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
};
