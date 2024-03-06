import PropTypes from 'prop-types';

import Thread from './thread';

export default function ThreadList({ threadList }) {
  return (
    <div className="flex flex-col gap-3">
      {threadList?.map((thread) => (
        <Thread key={thread?.id} thread={thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threadList: PropTypes.array,
};
