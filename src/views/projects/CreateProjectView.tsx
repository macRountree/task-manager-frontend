import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import ProjectForm from '@/components/projects/ProjectForm';
import {ProjectFormData} from 'interfaces';
export const CreateProjectView = () => {
  const initialValues: ProjectFormData = {
    projectName: '',
    clientName: '',
    description: '',
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: initialValues});

  const handleForm = (data: ProjectFormData) => {
    console.log(data);
  };
  return (
    <>
      <h1 className="text-5xl  font-black"> Create Project</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        {' '}
        Fill out the following form to create a project
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
          value="Create Project"
          className=" bg-amber-600 hover:bg-amber-700 w-full p-3 text-white font-bold rounded-lg cursor-pointer transition-colors"
        />
      </form>
    </>
  );
};
