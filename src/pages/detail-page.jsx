import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import { asyncReceiveThreadDetail } from '../states/threadDetail/action';

import { postedAt } from '../lib/format-posted';

import BackButton from '../components/back-button';
import CommentList from '../components/comment-list';
import FormCreateComment from '../components/form-create-comment';
import ButtonUpVoteThread from '../components/button-upvote-thread';
import ButtonDownVoteThread from '../components/button-downvote-thread';
import ButtonNeutralVoteThread from '../components/button-neutralvote-thread';

export default function DetailPage() {
  const { threadId } = useParams();
  const { threadDetail = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  const sanitizeData = DOMPurify.sanitize(threadDetail?.body);

  return (
    <section className="space-y-3">
      <div className="mb-6">
        <BackButton />
      </div>
      <div>
        <h2 className="text-3xl font-semibold capitalize">{threadDetail?.title}</h2>
        <p className="mt-2 px-1.5 py-1 text-sm border border-dashed rounded-md w-fit border-slate-700">{`#${threadDetail?.category}`}</p>
      </div>
      <div>
        <p className="my-6">{parse(sanitizeData)}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <ButtonUpVoteThread threadId={threadDetail?.id} upVotesBy={threadDetail?.upVotesBy} />
        <ButtonNeutralVoteThread
          threadId={threadDetail?.id}
          upVotesBy={threadDetail?.upVotesBy}
          downVotesBy={threadDetail?.downVotesBy}
        />
        <ButtonDownVoteThread threadId={threadDetail?.id} downVotesBy={threadDetail?.downVotesBy} />
        <div className="flex items-center gap-2 text-sm flexp-row">
          <div>
            <img
              src={`${threadDetail?.owner?.avatar}`}
              alt={`${threadDetail?.owner?.name}`}
              className="w-6 h-6 rounded-full"
            />
          </div>
          <p>
            Created by <strong>{threadDetail?.owner?.name}</strong>
          </p>
        </div>
        <div>
          <p>{postedAt(threadDetail?.createdAt)}</p>
        </div>
      </div>
      <div>
        <h2 className="mt-6 text-xl font-semibold">Comment Thread</h2>
        <FormCreateComment />
      </div>
      <div className="space-y-3">
        <h2 className="mt-8 mb-6 text-xl font-semibold">Comments {`(${threadDetail?.comments?.length})`}</h2>
        {threadDetail?.comments?.length > 0 ? (
          <CommentList comments={threadDetail?.comments} />
        ) : (
          <div>
            <p className="text-lg italic text-red-500">
              <strong>Not found</strong>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
