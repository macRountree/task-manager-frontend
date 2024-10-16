import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '../ErrorMessage';
import type {NewPasswordFormu, TokenConfirmation} from '@/interfaces/index';
import {useMutation} from '@tanstack/react-query';
import {updatePasswordWithToken} from '@/api/AuthAPI';
import {toast} from 'react-toastify';

interface NewPasswordFormProps {
  token: TokenConfirmation['token'];
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordFormu = {
    password: '',
    password_confirmation: '',
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm({defaultValues: initialValues});
  const {mutate} = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      reset();
      navigate('/auth/login');
    },
  });
  const handleNewPassword = (formData: NewPasswordFormu) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
  };

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Set your new password"
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
              required: 'Password confirmation is required',
              validate: value => value === password || 'Passwords do not match',
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Reset Password"
          className="bg-amber-600 hover:bg-amber-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
