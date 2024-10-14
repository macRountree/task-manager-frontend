import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@/components/ErrorMessage';
import {UserRegistrationForm} from '@/interfaces/index';
import {Link} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {registerUser} from '@/api/AuthAPI';
import {toast} from 'react-toastify';
export default function Register() {
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm<UserRegistrationForm>({defaultValues: initialValues});

  const {mutate} = useMutation({
    mutationFn: registerUser,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      reset();
    },
  });
  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Create Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill in the form to{' '}
        <span className=" text-amber-500 font-bold">create an account</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10 shadow-md rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3  border-gray-300 border"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'invalid email',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Nombre</label>
          <input
            type="name"
            placeholder="Username"
            className="w-full p-3  border-gray-300 border"
            {...register('name', {
              required: 'Username is required',
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password "
            className="w-full p-3  border-gray-300 border"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Confirm Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3  border-gray-300 border"
            {...register('password_confirmation', {
              required: 'Confirm Password is required',
              validate: value =>
                value === password || 'The passwords do not match',
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Sign Up"
          className="bg-amber-600 hover:bg-amber-700 w-full p-3  text-white font-black  text-xl cursor-pointer transition-colors"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/auth/login'}
          className="text-center text-gray-300 font-normal hover:text-amber-300 transition-colors"
        >
          Already have an account? Sign in
        </Link>
        <Link
          to={'/auth/forgot-password'}
          className="text-center text-gray-300 font-normal hover:text-amber-300 transition-colors"
        >
          Forgot your password? Reset it
        </Link>
      </nav>
    </>
  );
}
