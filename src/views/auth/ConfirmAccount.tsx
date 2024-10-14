import {Link} from 'react-router-dom';
import {PinInput, PinInputField} from '@chakra-ui/pin-input';
import {useState} from 'react';
import {TokenConfirmation} from '@/interfaces/index';
import {useMutation} from '@tanstack/react-query';
import {confirmAccount} from '@/api/AuthAPI';
import {toast} from 'react-toastify';
export default function ConfirmAccountView() {
  const [token, setToken] = useState<TokenConfirmation['token']>('');

  const handleChange = (token: TokenConfirmation['token']) => {
    setToken(token);
  };
  const {mutate} = useMutation({
    mutationFn: confirmAccount,

    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      toast.success(data);
    },
  });
  const handleComplete = (token: TokenConfirmation['token']) => mutate({token});
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirm Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Type the code sent to you
        {''}
        <span className=" text-amber-500 font-bold">
          {' '}
          to confirm your account
        </span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          6-digit Code
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange} //*react prop
            onComplete={handleComplete} //*PinInput prop. Throws an event when the input is completed
          >
            {' '}
            //* state
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-300 font-normal hover:text-gray-500 transition-colors"
        >
          Didn't receive the code? Request a new one
        </Link>
      </nav>
    </>
  );
}
