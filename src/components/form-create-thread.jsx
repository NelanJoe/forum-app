import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function FormCreateThread({ addThread }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const onChangeTitle = ({ target }) => {
    setTitle(target.value);
  };

  const onChangeCategory = ({ target }) => {
    setCategory(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !body) return;

    addThread({ title, category, body });

    navigate('/');

    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-6 border border-dashed rounded border-rose-500">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={onChangeTitle}
            placeholder="Bug in ReduxJs"
            className="px-3 py-2 border rounded-md focus:outline-rose-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            value={category}
            onChange={onChangeCategory}
            placeholder="Bug"
            className="px-3 py-2 border rounded-md focus:outline-rose-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category">Category</label>
          <ReactQuill
            id="body"
            theme="snow"
            value={body}
            onChange={setBody}
            placeholder="I found a bug with old version ReduxJs...."
            className="mb-16 h-36 "
          />
        </div>
        <div>
          <button className="w-full py-2 text-white rounded-md bg-rose-500">Add New Thread</button>
        </div>
      </div>
    </form>
  );
}

FormCreateThread.propTypes = {
  addThread: PropTypes.func.isRequired,
};
