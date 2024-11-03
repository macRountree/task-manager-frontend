import {Fragment} from 'react';
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {getProjectTeam, removeUserFromProject} from '@/api/TeamAPI';
import AddMemberModal from '@/components/team/AddMemberModal';
import {Transition, Menu} from '@headlessui/react';
import {toast} from 'react-toastify';
export const ProjectTeamView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const {data, isError, isLoading} = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: removeUserFromProject,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]});
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <Navigate to={'/404'} />;
  }
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Manage Team Members</h1>
        <p className="text-2xl font-light mt-5 text-gray-600">
          Manage your team members here.{' '}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 py-3 px-10 rounded-md text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(`${location.pathname}?addMember=true`)} //*add query parameter to the url
          >
            Add Team Member
          </button>
          <Link
            to={`/projects/${projectId}`}
            className="bg-amber-600 hover:bg-amber-6}700 py-3 px-10 rounded-md text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Back to Project Details
          </Link>
        </nav>

        <h2 className="text-5xl font-black my-10">Team Members</h2>
        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data?.map(member => (
              <li
                key={member._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">
                      {member.name}{' '}
                    </p>
                    <p className="text-sm text-gray-400">{member.email} </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">Options</span>
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
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() =>
                              mutate({projectId, userId: member._id})
                            }
                          >
                            Remove Member
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">No hay miembros en este equipo</p>
        )}
        <AddMemberModal />
      </>
    );
};