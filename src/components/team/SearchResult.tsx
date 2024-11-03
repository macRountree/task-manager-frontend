import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TeamMember} from '@/interfaces/index';
import {addUserToProject} from '@/api/TeamAPI';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
interface SearchResultProps {
  user: TeamMember;
  reset: () => void;
}
export const SearchResult = ({user, reset}: SearchResultProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: addUserToProject,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]});
    },
  });
  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold ">Result: </p>
      <div className="flex justify-between items-center">
        <p>{user.name} </p>
        <button
          onClick={handleAddUserToProject}
          className="text-amber-600 hover:bg-amber-100 px-10 py-3 font-bold cursor-pointer transition-colors rounded-md"
        >
          {' '}
          Add to Project{' '}
        </button>
      </div>
    </>
  );
};