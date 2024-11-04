import {Link} from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        Page Not Found
      </h1>{' '}
      <p>
        Go back to
        <Link className="text-amber-500" to={'/'}>
          {' '}
          Home{' '}
        </Link>
      </p>
    </>
  );
};
