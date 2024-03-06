import { useDispatch } from 'react-redux';
import LoginInput from '../components/login-input';
import { asyncSetAuthUser } from '../states/authUser/action';

export default function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section>
      <h2 className="mb-6 text-4xl font-semibold text-center">
        Forum<span className="text-rose-500">App</span>
      </h2>
      <div className="w-full px-4 py-4 border border-dashed rounded-md shadow-md border-rose-500">
        <LoginInput login={onLogin} />
      </div>
    </section>
  );
}
