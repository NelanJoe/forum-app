import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/leaderboard-list';
import BackButton from '../components/back-button';

export default function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section>
      <div className="mb-8">
        <BackButton />
      </div>
      <h2 className="text-2xl font-semibold underline decoration-dashed decoration-rose-500 underline-offset-8">
        User Active Leaderboards
      </h2>
      <div className="flex flex-row items-center justify-between mt-6 mb-2">
        <p className="font-medium">
          <strong>Users</strong>
        </p>
        <p className="font-medium">
          <strong>Score</strong>
        </p>
      </div>
      <LeaderboardList leaderboards={leaderboards} />
    </section>
  );
}
