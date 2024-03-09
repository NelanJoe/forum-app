import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BoxesIcon, LogOutIcon } from 'lucide-react';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export default function Header() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b bg-white/30 border-slate-500 backdrop-blur-lg backdrop-filter">
        <nav className="flex items-center justify-between h-16 max-w-6xl mx-4 2xl:mx-auto">
          <h2 className="text-2xl font-semibold">
            <Link to="/">
              <div className="flex items-center gap-2">
                Forum <span className="text-rose-500">App</span>
                <BoxesIcon className="w-4 h-4" />
              </div>
            </Link>
          </h2>
          {authUser ? (
            <div className="flex flex-row items-center gap-3">
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 border border-dashed border-slate-700 rounded-lg shadow"
              >
                <div className="flex flex-row items-center gap-1 text-sm">
                  <LogOutIcon className="w-4 h-4" />
                  <span className="capitalize">{authUser?.name}</span>
                </div>
              </button>
            </div>
          ) : null}
        </nav>
      </header>
    </>
  );
}
