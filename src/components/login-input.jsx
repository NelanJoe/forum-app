import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useInput from '../hooks/use-input';

export default function LoginInput({ login }) {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="inputEmail">Email</label>
          <input
            id="inputEmail"
            name="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
            className="w-full px-2 border py-1.5 rounded-md focus:outline-rose-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inputPassword">Password</label>
          <input
            id="inputPassword"
            name="password"
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
            className="w-full px-2 border py-1.5 rounded-md focus:outline-rose-500"
          />
        </div>
        <button className="w-full px-4 py-2 font-semibold text-white rounded-md bg-rose-500 hover:bg-rose-600">
          Login
        </button>
        <div>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="italic font-medium underline text-rose-500">
            Register here
          </Link>
        </div>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
