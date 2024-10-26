import {Link, Navigate, Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Logo} from '@/components/Logo';
import NavMenu from '@/components/NavMenu';
import {useAuth} from '@/hooks/useAuth';

export const AppLayout = () => {
  const {data, isError, isLoading} = useAuth();
  console.log(data);
  console.log(isError);
  console.log(isLoading);

  if (isLoading) return 'Loading...';
  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data)
    return (
      <>
        <header className="bg-green-900 py-5">
          <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-64 hover:shadow-2xl hover:border-transparent hover:rounded-md transition  ">
              <Link to={'/'}>
                <Logo />
              </Link>
            </div>
            <NavMenu name={data.name} />
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
