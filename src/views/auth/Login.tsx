import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@/components/ErrorMessage';
import {UserLoginForm} from '@/interfaces/index';
import {Link} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {login} from '@/api/AuthAPI';
import {toast} from 'react-toastify';
export default function Login() {
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: initialValues});

  const {mutate} = useMutation({
    mutationFn: login,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Log in</h1>
      <p className="text-2xl font-light text-white mt-5">
        Start planning your projects today{' '}
        <span className=" text-amber-500 font-bold">by logging in</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="User Email"
            className="w-full p-3  border-gray-300 border"
            {...register('email', {
              required: 'E-mail is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3  border-gray-300 border"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Sign In"
          className="bg-amber-600 hover:bg-amber-700 w-full p-3  text-white font-black  text-xl cursor-pointer transition-colors"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/auth/register'}
          className="text-center text-gray-300 font-normal hover:text-amber-300 transition-colors"
        >
          Don't have an account? Sign Up
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
