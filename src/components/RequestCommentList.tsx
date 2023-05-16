import { RequestComment } from '@components/RequestComment';
import { useState } from 'react';

export const RequestCommentList = ({ comments }: { comments: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const sortedComments = comments.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return (
    <div className='ml-3 flex flex-col gap-1 mb-3 font-light'>
      {comments.length === 0 ? (
        'no comments'
      ) : (
        <>
          <RequestComment comment={comments[0].comment} date={comments[0].created_at} />
          {showAll &&
            sortedComments
              .slice(1)
              .map((comment) => (
                <RequestComment key={comment.id} comment={comment.comment} date={comment.created_at} />
              ))}
          {comments.length > 1 && (
            <button
              type='button'
              className='text-sm font-bold text-rose-500 hover:text-rose-600 text-left'
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show less comments' : `Show all comments (+${comments.length - 1})`}
            </button>
          )}
        </>
      )}
    </div>
  );
};
