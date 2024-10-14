import {validateToken} from '@/api/AuthAPI';
import {TokenConfirmation} from '@/interfaces/index';
import {PinInput, PinInputField} from '@chakra-ui/pin-input';
import {useMutation} from '@tanstack/react-query';
import {Dispatch} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

interface NewPasswordFormProps {
  token: TokenConfirmation['token'];
  setToken: Dispatch<React.SetStateAction<string>>;
  setIsValidToken: Dispatch<React.SetStateAction<boolean>>;
}

export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordFormProps) {
  const {mutate} = useMutation({
    mutationFn: validateToken,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
      setIsValidToken(true); //* set isValidToken to true to show the NewPasswordForm
    },
  });

  const handleChange = (token: TokenConfirmation['token']) => {
    setToken(token);
  };
  const handleComplete = (token: TokenConfirmation['token']) => {
    mutate({token});
  };

  return (
    <>
      <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-300 font-normal"
        ></Link>
      </nav>
    </>
  );
}
