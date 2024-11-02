import {getProjectById} from '@/api/ProjectAPI';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import {EditTaskData} from '@/components/tasks/EditTaskData';
import {TaskList} from '@/components/tasks/TaskList';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import {isManager} from '@/helpers/policies';
import {useAuth} from '@/hooks/useAuth';
import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
export const ProjectDetailsView = () => {
  const {data: user, isLoading: authLoading} = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  //   console.log(params);
  const projectId = params.projectId!; //*

  const {data, isLoading, isError} = useQuery({
    queryKey: ['editProject', projectId], //* add projectId to the key for differentiating the query
    queryFn: () => getProjectById(projectId),

    retry: false, //*try to refetch the data if the query fails
  });
  //   console.log(`${error}, isError: ${isError}`);
  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);
  // console.log(canEdit);
  if (isLoading && authLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/404" />;
  if (data && user)
    return (
      <>
        {' '}
        <h1 className="text-5xl font-black">{data.projectName} </h1>
        <p className="text-2xl font-light mt-5 text-gray-600">
          {data.description}{' '}
        </p>
        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-amber-500 hover:bg-amber-600 py-3 px-10 rounded-md text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() => navigate(`${location.pathname}?newTask=true`)} //*add query parameter to the url
            >
              Add Task
            </button>
            <Link
              className="bg-amber-600 hover:bg-amber-700 py-3 px-10 rounded-md text-white text-xl font-bold cursor-pointer transition-colors"
              to="team"
            >
              Team Members
            </Link>
          </nav>
        )}
        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
};
