const CommentList = ({ comment }) => {
  return (
    <div className="flex flex-col gap-1 text-sm" key={comment.id}>
      <div className="break-words">
        <span className="font-bold">{comment.username}: </span>
        <span>{comment.comment}</span>
      </div>

      <div className="flex gap-2">
        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default CommentList;
