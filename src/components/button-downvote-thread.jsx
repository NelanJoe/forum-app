import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbsDownIcon } from 'lucide-react';
import PropTypes from 'prop-types';

import { asyncToggleDownVoteThread } from '../states/threads/action';
import { asyncToggleDownVoteThreadDetail } from '../states/threadDetail/action';

export default function ButtonDownVoteThread({ threadId, downVotesBy }) {
  const { authUser = null } = useSelector((states) => states);

  const isLiked = useMemo(() => {
    return downVotesBy?.includes(authUser.id);
  }, [downVotesBy, authUser]);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onDownVote = useCallback(
    (event) => {
      event.stopPropagation();

      if (pathname === '/') {
        dispatch(asyncToggleDownVoteThread(threadId));
      } else {
        dispatch(asyncToggleDownVoteThreadDetail(threadId));
      }
    },
    [dispatch, pathname, threadId]
  );

  return (
    <button type="button" title="down-vote" aria-label="down-vote" onClick={onDownVote}>
      <div className="flex flex-row items-center gap-2">
        {isLiked === true ? (
          <ThumbsDownIcon className="w-4 h-4 text-rose-500 fill-rose-500" />
        ) : (
          <ThumbsDownIcon className="w-4 h-4" />
        )}
        <span>{downVotesBy?.length}</span>
      </div>
    </button>
  );
}

ButtonDownVoteThread.propTypes = {
  threadId: PropTypes.string,
  downVotesBy: PropTypes.array,
};
