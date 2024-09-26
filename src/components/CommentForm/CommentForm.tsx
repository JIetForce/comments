import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { addComment } from "../../features/comments/commentsSlice";
import { toast } from "react-hot-toast";

const CommentForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [commentBody, setCommentBody] = useState<string>(
    () => localStorage.getItem("commentInput") || ""
  );

  const addStatus = useSelector((state: RootState) => state.comments.addStatus);

  useEffect(() => {
    localStorage.setItem("commentInput", commentBody);
  }, [commentBody]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentBody.trim()) {
      const newComment = { body: commentBody, postId: 4, userId: 1 };
      const resultAction = await dispatch(addComment(newComment));
      setCommentBody("");
      localStorage.removeItem("commentInput");

      if (addComment.fulfilled.match(resultAction)) {
        toast.success("Comment added successfully.");
      } else {
        toast.error(`Failed to add comment: ${resultAction.error.message}`);
      }
    }
  };

  return (
    <Form.Root
      onSubmit={handleSubmit}
      className="max-w-xl w-full mx-auto bg-white p-4 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <Form.Field name="commentBody">
          <div className="mb-2">
            <Form.Label className="block text-sm font-medium text-gray-700">
              Add a comment
            </Form.Label>
          </div>
          <Form.Control asChild>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Write your comment..."
            />
          </Form.Control>
        </Form.Field>
      </div>
      <Form.Submit asChild>
        <button
          type="submit"
          disabled={addStatus === "loading" || !commentBody.trim()}
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addStatus === "loading" ? "Posting..." : "Post"}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default CommentForm;
