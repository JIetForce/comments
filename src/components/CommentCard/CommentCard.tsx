import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import * as Avatar from "@radix-ui/react-avatar";
import { CommentType } from "../../types/commentTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { deleteComment } from "../../features/comments/commentsSlice";
import { toast } from "react-hot-toast";
import { getInitials } from "../../utils/common";

type CommentCardProps = {
  comment: CommentType;
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const deleteStatus = useSelector(
    (state: RootState) => state.comments.deleteStatus
  );

  const isLoading = deleteStatus === "loading";

  const handleDelete = async () => {
    const resultAction = await dispatch(deleteComment(comment.id));
    if (deleteComment.fulfilled.match(resultAction)) {
      toast.success("Comment deleted successfully.");
    } else {
      toast.error(`Failed to delete comment: ${resultAction.error.message}`);
    }

    setOpen(false);
  };

  return (
    <li className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-start">
      <div className="flex-1 flex items-start">
        <Avatar.Root className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <Avatar.Image className="rounded-full" alt={comment.user.username} />
          <Avatar.Fallback>
            {getInitials(comment.user.fullName)}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="ml-3">
          <Label.Root className="block text-sm font-medium text-gray-700">
            {comment.user.username}
          </Label.Root>
          <p className="mt-2 text-gray-600">{comment.body}</p>
          <p className="mt-2 text-sm text-gray-500">
            Likes: {comment.likes || 0}
          </p>
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          asChild
          className="ml-4 bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >
          <button>Delete</button>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-80 p-6 bg-white rounded-md transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">
            Confirm Deletion
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <Dialog.Close asChild>
              <button
                className="mr-2 bg-gray-300 text-gray-800 px-4 py-1 rounded-md hover:bg-gray-400 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleDelete}
              className={`bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Confirm
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </li>
  );
};

export default CommentCard;
