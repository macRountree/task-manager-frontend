import NewPasswordToken from '@/components/auth/NewPasswordToken';
import {useState} from 'react';
import NewPasswordForm from '../../components/auth/NewPasswordForm';
import {TokenConfirmation} from '@/interfaces/index';

export const NewPasswordView = () => {
  const [token, setToken] = useState<TokenConfirmation['token']>('');
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter code that was sent to
        <span className=" text-amber-500 font-bold">
          your email and your new password{' '}
        </span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
};
