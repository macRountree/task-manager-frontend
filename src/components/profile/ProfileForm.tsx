import {useForm} from 'react-hook-form';
import {User, UserProfileForm} from '../../interfaces/index';
import {ErrorMessage} from '../ErrorMessage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateProfile} from '@/api/ProfileAPI';
import {toast} from 'react-toastify';

interface ProfileFormProps {
  data: User;
}

export default function ProfileForm({data}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: data});
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: updateProfile,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
  const handleEditProfile = (formdata: UserProfileForm) => {
    mutate(formdata);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-black ">My Profile</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Update your profile
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Username"
              className="w-full p-3  border border-gray-200"
              {...register('name', {
                required: 'Name is required',
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              E-mail
            </label>
            <input
              id="text"
              type="email"
              placeholder="Email"
              className="w-full p-3  border border-gray-200"
              {...register('email', {
                required: 'E-mail is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email',
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Update Profile"
            className="bg-amber-600 w-full p-3 text-white uppercase font-bold hover:bg-amber-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
