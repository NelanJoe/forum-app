import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MehIcon, SmileIcon } from 'lucide-react';
import PropTypes from 'prop-types';

import { asyncToggleNeutralVoteThread } from '../states/threads/action';
import { asyncToggleNeutralVoteThreadDetail } from '../states/threadDetail/action';

export default function ButtonNeutralVoteThread({ threadId, upVotesBy, downVotesBy }) {
  const { authUser = null } = useSelector((states) => states);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isNeutralVote = useMemo(() => {
    const isVote = upVotesBy?.includes(authUser.id);
    const isUnVote = downVotesBy?.includes(authUser.id);

    return !isVote && !isUnVote;
  }, [upVotesBy, downVotesBy, authUser]);

  const onNeutralVote = useCallback(
    (event) => {
      event.stopPropagation();

      if (pathname === '/') {
        dispatch(asyncToggleNeutralVoteThread(threadId));
      } else {
        dispatch(asyncToggleNeutralVoteThreadDetail(threadId));
      }
    },
    [pathname, dispatch, threadId]
  );

  return (
    <button type="button" aria-label="neutral-vote" onClick={onNeutralVote}>
      <div className="flex flex-row items-center gap-2">
        {isNeutralVote ? <SmileIcon className="w-4 h-4 text-yellow-500" /> : <MehIcon className="w-4 h-4" />}
      </div>
    </button>
  );
}

ButtonNeutralVoteThread.propTypes = {
  threadId: PropTypes.string,
  upVotesBy: PropTypes.array,
  downVotesBy: PropTypes.array,
};
