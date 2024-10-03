import {getProjectById} from '@/api/ProjectAPI';
import {EditProjectForm} from '@/components/projects/EditProjectForm';
import {useQuery} from '@tanstack/react-query';
import {Navigate, useParams} from 'react-router-dom';
export const EditProjectView = () => {
  const params = useParams();
  //   console.log(params);
  const projectId = params.projectId!; //*

  const {data, isLoading, isError} = useQuery({
    queryKey: ['editProject', projectId], //* add projectId to the key for differentiating the query
    queryFn: () => getProjectById(projectId),

    retry: false, //*try to refetch the data if the query fails
  });
  //   console.log(`${error}, isError: ${isError}`);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/404" />;

  if (data) return <EditProjectForm data={data} projectId={projectId} />;
};
