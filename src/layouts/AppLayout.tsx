import {Link, Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Logo} from '@/components/Logo';
import NavMenu from '@/components/NavMenu';

export const AppLayout = () => {
  return (
    <>
      <header className="bg-green-900 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64 hover:shadow-2xl hover:border-transparent hover:rounded-md transition  ">
            <Link to={'/'}>
              <Logo />
            </Link>
          </div>
          <NavMenu />
        </div>
        <nav></nav>
      </header>
      <section className=" max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          All rights reserved &copy; {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};
