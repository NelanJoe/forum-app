import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { asyncRegisterUser } from '../states/users/action';

import RegisterInput from '../components/register-input';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section>
      <h2 className="mb-6 text-4xl font-semibold text-center">
        Forum<span className="text-rose-500">App</span>
      </h2>
      <RegisterInput register={onRegister} />
    </section>
  );
}
