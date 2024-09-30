import {Link} from 'react-router-dom';

export const DashboardView = () => {
  return (
    <>
      <h1 className="text-5xl  font-black"> My Projects</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        {' '}
        Manage and administrate your Projects
      </p>

      <nav className="my-5">
        <Link
          to="/projects/create"
          className="bg-yellow-500 hover:bg-yellow-600 px-10 py-3 rounded-md text-white font-bold cursor-pointer transition-colors"
        >
          {' '}
          Create Project
        </Link>
      </nav>
    </>
  );
};
