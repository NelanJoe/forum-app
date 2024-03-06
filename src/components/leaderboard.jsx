import PropTypes from 'prop-types';

export default function Leaderboard({ user, score }) {
  return (
    <div className="flex flex-row items-center justify-between px-2.5 py-2 rounded-lg border border-dashed border-slate-500 shadow-sm group-hover:shadow-lg transition-all duration-100">
      <div className="flex flex-row items-center gap-2">
        <img
          src={user.avatar}
          alt={`user-${user.name}`}
          className="w-12 h-12 transition-all duration-100 rounded-full group-hover:shadow-md "
        />
        <p className="capitalize">{user.name}</p>
      </div>
      <p>{score}</p>
    </div>
  );
}

Leaderboard.propTypes = {
  user: PropTypes.object,
  score: PropTypes.number,
};
