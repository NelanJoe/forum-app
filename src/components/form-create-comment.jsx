import { useState } from 'react';
import { useDispatch } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useParams } from 'react-router-dom';
import { asyncCreateComment } from '../states/threadDetail/action';

export default function FormCreateComment() {
  const { threadId } = useParams();

  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const handleAddThread = () => {
    dispatch(asyncCreateComment(threadId, comment));
    setComment('');
  };

  return (
    <div className="my-6">
      <ReactQuill className="h-20 mb-14" value={comment} onChange={setComment} placeholder="Comment here..." />
      <button
        type="button"
        onClick={handleAddThread}
        className="w-full py-2 mt-6 text-white rounded-md xl:mt-0 bg-slate-500"
      >
        Save Comment
      </button>
    </div>
  );
}
