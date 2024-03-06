import PropTypes from 'prop-types';
import Leaderboard from './leaderboard';

export default function LeaderboardList({ leaderboards }) {
  return (
    <div className="flex flex-col gap-2">
      {leaderboards.map((leaderboard) => (
        <div key={leaderboard.user.id} className="group">
          <Leaderboard user={leaderboard.user} score={leaderboard.score} />
        </div>
      ))}
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.array,
};
