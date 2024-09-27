import React, { useEffect } from "react";
import Comment from "../CommentCard/CommentCard";
import * as Label from "@radix-ui/react-label";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchComments } from "../../features/comments/commentsSlice";

const CommentList: React.FC = () => {
  const comments = useSelector((state: RootState) => state.comments.comments);

  const dispatch = useDispatch<AppDispatch>();
  const fetchStatus = useSelector(
    (state: RootState) => state.comments.fetchStatus
  );

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchComments());
    }
  }, [fetchStatus, dispatch]);

  return (
    <div className="p-4 w-full max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <Label.Root className="block text-lg font-medium text-gray-700 mb-4">
        {`Comments ${
          fetchStatus === "succeeded" ? `(${comments?.length})` : ""
        }`}
      </Label.Root>
      {fetchStatus === "loading" && <p>Loading comments...</p>}
      {fetchStatus === "failed" && (
        <p>Something went wrong. Please try again.</p>
      )}
      <ul className="space-y-4">
        {comments?.map((comment, i) => (
          <Comment key={comment.id + i} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
