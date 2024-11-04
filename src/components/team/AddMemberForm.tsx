import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {ErrorMessage} from '../ErrorMessage';
import {TeamMemberForm} from '@/interfaces/index';
import {findUserByEmail} from '@/api/TeamAPI';
import {SearchResult} from './SearchResult';
export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: '',
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({defaultValues: initialValues});
  //* Mutation to search for a user by email and get all objet
  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = {
      projectId,
      formData,
    };
    mutation.mutate(data);
    console.log(mutation);
  };
  const resetData = () => {
    reset();
    mutation.reset();
  };
  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            User Email
          </label>
          <input
            id="name"
            type="text"
            placeholder="User Email"
            className="w-full p-3  border-gray-300 border"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className=" bg-amber-600 hover:bg-amber-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Search User"
        />
      </form>
      <div>
        {mutation.isPending && <p className="text-center mt-10">Loading...</p>}
        {mutation.isError && (
          <p className="text-center mt-10">{mutation.error.message} </p>
        )}
        {mutation.data && (
          <SearchResult user={mutation.data} reset={resetData} />
        )}
      </div>
    </>
  );
}
