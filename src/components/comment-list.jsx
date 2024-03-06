import PropTypes from 'prop-types';
import Comment from './comment';

export default function CommentList({ comments }) {
  return (
    <div className="flex flex-col gap-4">
      {comments?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
};
