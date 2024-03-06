import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { MehIcon, SmileIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import {
  asyncToggleUpVoteCommentThreadDetail,
  asyncToggleDownVoteCommentThreadDetail,
  asyncToggleNeutralVoteCommentThreadDetail,
} from '../states/threadDetail/action';

import { postedAt } from '../lib/format-posted';

function Comment({ comment }) {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  const sanitizeDataCommentContent = DOMPurify.sanitize(comment.content);

  const isUpVote = useMemo(() => {
    return comment?.upVotesBy?.includes(authUser.id);
  }, [comment, authUser]);

  const isNeutralVote = useMemo(() => {
    const isVote = comment?.upVotesBy?.includes(authUser.id);
    const isUnVote = comment?.downVotesBy?.includes(authUser.id);

    return !isVote && !isUnVote;
  }, [comment, authUser]);

  const isDownVote = useMemo(() => {
    return comment?.downVotesBy?.includes(authUser.id);
  }, [comment, authUser]);

  const onUpVoteComment = useCallback(
    (commentId) => {
      dispatch(asyncToggleUpVoteCommentThreadDetail(commentId));
    },
    [dispatch],
  );

  const onNeutralVoteComment = useCallback(
    (commentId) => {
      dispatch(asyncToggleNeutralVoteCommentThreadDetail(commentId));
    },
    [dispatch],
  );

  const onDownVoteComment = useCallback(
    (commentId) => {
      dispatch(asyncToggleDownVoteCommentThreadDetail(commentId));
    },
    [dispatch],
  );

  return (
    <div key={comment.id} className="space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img src={`${comment?.owner.avatar}`} alt={`${comment?.owner.name}`} className="w-8 h-8 rounded-full" />
          <p>{comment.owner.name}</p>
        </div>
        <p>{postedAt(comment.createdAt)}</p>
      </div>
      <p>{parse(sanitizeDataCommentContent)}</p>
      <div className="flex flex-row items-center gap-4">
        <button onClick={() => onUpVoteComment(comment.id)}>
          <div className="flex flex-row items-center gap-2">
            {isUpVote ? (
              <ThumbsUpIcon className="w-4 h-4 text-green-500 fill-green-500" />
            ) : (
              <ThumbsUpIcon className="w-4 h-4" />
            )}
            <span>{comment.upVotesBy?.length}</span>
          </div>
        </button>
        <button onClick={() => onNeutralVoteComment(comment.id)}>
          {isNeutralVote ? <SmileIcon className="w-4 h-4 text-yellow-500" /> : <MehIcon className="w-4 h-4" />}
        </button>
        <button onClick={() => onDownVoteComment(comment.id)}>
          <div className="flex flex-row items-center gap-2">
            {isDownVote ? (
              <ThumbsDownIcon className="w-4 h-4 fill-rose-500 text-rose-500" />
            ) : (
              <ThumbsDownIcon className="w-4 h-4" />
            )}
            <span>{comment.downVotesBy?.length}</span>
          </div>
        </button>
      </div>
      <div className="border-b border-solid"></div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  commentContent: PropTypes.string,
};

export default Comment;
