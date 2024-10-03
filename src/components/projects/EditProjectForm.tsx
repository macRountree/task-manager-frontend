import ProjectForm from './ProjectForm';
import {Project, ProjectFormData} from '@/interfaces/index';
import {updateProject} from '@/api/ProjectAPI';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';
interface EditProjectFormProps {
  data: ProjectFormData;
  projectId: Project['_id'];
}

export const EditProjectForm = ({data, projectId}: EditProjectFormProps) => {
  console.log(data);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: updateProject,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['projects']});
      queryClient.invalidateQueries({queryKey: ['editProjects', projectId]});
      //* invalidate the query to refetch the data
      toast.success(data);
      navigate('/');
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };

    mutate(data); //! mutate only accepts one argument, need create object with the id
  };
  return (
    <>
      <h1 className="text-5xl  font-black"> Edit Project</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        {' '}
        Fill out the following form to edit a project
      </p>

      <nav className="my-5">
        <Link
          to="/"
          className="bg-yellow-500 hover:bg-yellow-600 px-10 py-3 rounded-md text-white font-bold cursor-pointer transition-colors"
        >
          {' '}
          Home
        </Link>
      </nav>

      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm register={register} errors={errors} />
        <input
          type="submit"
          value="Save Project Changes"
          className=" bg-amber-600 hover:bg-amber-700 w-full p-3 text-white font-bold rounded-lg cursor-pointer transition-colors"
        />
      </form>
    </>
  );
};
