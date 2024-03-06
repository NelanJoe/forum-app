import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useInput from '../hooks/use-input';

export default function RegisterInput({ register }) {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) return;

    register({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-4 py-4 border border-dashed rounded-md shadow-md border-rose-500"
    >
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="inputName">Name</label>
          <input
            id="inputName"
            name="name"
            type="text"
            value={name}
            onChange={onChangeName}
            placeholder="Name"
            className="w-full px-2 border py-1.5 rounded-md focus:outline-rose-500"
          />
        </div>
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
          Register
        </button>
        <div>
          Already have an account?{' '}
          <Link to="/" className="italic font-medium underline text-rose-500">
            Login here
          </Link>
        </div>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
