import {Fragment} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Menu, Transition} from '@headlessui/react';
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import {getAllProjects} from '@/api/ProjectAPI';
import {useAuth} from '@/hooks/useAuth';
import {isManager} from '@/helpers/policies';
import DeleteProjectModal from '@/components/projects/DeleteProjectModal';
import {Link, useLocation, useNavigate} from 'react-router-dom';
export const DashboardView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {data: user, isLoading: authLoading} = useAuth();
  const {data, isLoading} = useQuery({
    queryKey: ['projects'], //* key to identify the query , in this case is projects, need to be unique
    queryFn: getAllProjects, //* function to be executed
  });

  console.log(data, 'data Dashhboard');
  // console.log(data, isLoading);
  if (isLoading && authLoading) return <p>Loading...</p>;
  if (data && user)
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
        {data.length ? (
          <ul
            role="list"
            className="  divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map(project => (
              <li
                key={project._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    {isManager(project.manager, user._id) ? (
                      <p className="bg-green-600 text-center py-1 px-5 text-white font-bold rounded-md text-xs">
                        {' '}
                        Manager{' '}
                      </p>
                    ) : (
                      <p className="bg-blue-600 text-center py-1 px-5 text-white font-bold rounded-lg text-xs">
                        Member
                      </p>
                    )}
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Client: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only"> Options </span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={`/projects/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Project Details
                          </Link>
                        </Menu.Item>

                        {project.manager === user._id && (
                          <>
                            <Menu.Item>
                              <Link
                                to={`/projects/${project._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Edit Project
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() => {
                                  navigate(
                                    location.pathname +
                                      `?deleteProject=${project._id}`
                                  );
                                }}
                              >
                                Delete Project
                              </button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            Not Projects Yet{' '}
            <Link
              to={'/projects/create'}
              className="text-amber-600 font-bold hover:opacity-50"
            >
              Create Project
            </Link>{' '}
          </p>
        )}
        <DeleteProjectModal />
      </>
    );
};
