import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { MessageSquareReplyIcon } from 'lucide-react';

import ButtonDownVoteThread from './button-downvote-thread';
import ButtonUpVoteThread from './button-upvote-thread';
import ButtonNeutralVoteThread from './button-neutralvote-thread';

import { postedAt } from '../lib/format-posted';

export default function Thread({ thread }) {
  const sanitizedData = DOMPurify.sanitize(thread?.body);
  return (
    <article
      key={thread?.id}
      className="px-3 border rounded-md py-2.5 break-words space-y-3 border-dashed border-slate-500"
    >
      <h3 className="text-xl font-medium capitalize transition-all duration-150 hover:text-red-600">
        <Link to={`/threads/${thread?.id}`}>{thread?.title}</Link>
      </h3>
      <p>{parse(sanitizedData.slice(0, 150))}...</p>
      <div className="flex flex-row">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row items-center gap-3 text-sm">
            <ButtonUpVoteThread threadId={thread?.id} upVotesBy={thread?.upVotesBy} />
            <ButtonNeutralVoteThread
              threadId={thread?.id}
              upVotesBy={thread?.upVotesBy}
              downVotesBy={thread?.downVotesBy}
            />
            <ButtonDownVoteThread threadId={thread?.id} downVotesBy={thread?.downVotesBy} />
            <div className="flex flex-row items-center gap-1">
              <MessageSquareReplyIcon className="w-4 h-4" />
              <span>{thread?.totalComments}</span>
            </div>
          </div>
          <div>
            <p className="text-sm">{postedAt(thread?.createdAt)}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <img src={`${thread?.user.avatar}`} alt={`${thread?.user.name}`} className="w-6 h-6 rounded-full" />
            </div>
            <p className="text-sm">
              Created by <strong>{thread?.user.name}</strong>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

Thread.propTypes = {
  thread: PropTypes.object,
};
