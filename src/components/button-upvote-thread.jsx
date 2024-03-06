import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbsUpIcon } from 'lucide-react';
import PropTypes from 'prop-types';

import { asyncToggleUpVoteThread } from '../states/threads/action';
import { asyncToggleUpVoteThreadDetail } from '../states/threadDetail/action';

export default function ButtonUpVoteThread({ threadId, upVotesBy }) {
  const { authUser = null } = useSelector((states) => states);

  const isLiked = useMemo(() => {
    return upVotesBy?.includes(authUser.id);
  }, [upVotesBy, authUser]);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onUpVote = useCallback(
    (event) => {
      event.stopPropagation();

      if (pathname === '/') {
        dispatch(asyncToggleUpVoteThread(threadId));
      } else {
        dispatch(asyncToggleUpVoteThreadDetail(threadId));
      }
    },
    [pathname, dispatch, threadId]
  );

  return (
    <button type="button" aria-label="up-vote" onClick={onUpVote}>
      <div className="flex flex-row items-center gap-2">
        {isLiked === true ? (
          <ThumbsUpIcon className="w-4 h-4 text-green-500 fill-green-500" />
        ) : (
          <ThumbsUpIcon className="w-4 h-4" />
        )}
        <span>{upVotesBy?.length}</span>
      </div>
    </button>
  );
}

ButtonUpVoteThread.propTypes = {
  threadId: PropTypes.string,
  upVotesBy: PropTypes.array,
};
