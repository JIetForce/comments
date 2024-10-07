import React, { useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "../../app/store";
import { addComment } from "../../features/comments/commentsSlice";
import { toast } from "react-hot-toast";

type CommentFormValues = {
  comment: string;
};

const CommentForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CommentFormValues>({
    defaultValues: {
      comment: localStorage.getItem("commentInput") || "",
    },
    mode: "onChange",
  });

  const addStatus = useSelector((state: RootState) => state.comments.addStatus);

  const isDisabled =
    isSubmitting || !!Object.keys(errors).length || !watch("comment").trim();

  useEffect(() => {
    const commentInput = localStorage.getItem("commentInput") || "";
    setValue("comment", commentInput);
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.comment !== "") {
        localStorage.setItem("commentInput", value.comment || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: CommentFormValues) => {
    const newComment = { body: data.comment, postId: 4, userId: 1 };
    const resultAction = await dispatch(addComment(newComment));

    if (addComment.fulfilled.match(resultAction)) {
      toast.success("Comment added successfully.");
      reset();
      localStorage.removeItem("commentInput");
    } else {
      toast.error(`Failed to add comment: ${resultAction.error.message}`);
    }
  };

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl w-full mx-auto bg-white p-4 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <Form.Field name="comment">
          <div className="mb-2">
            <Form.Label className="block text-sm font-medium text-gray-700">
              Add a comment
            </Form.Label>
          </div>
          <Form.Control asChild>
            <textarea
              {...register("comment", {
                minLength: {
                  value: 10,
                  message: "Comment must be at least 10 characters",
                },
                maxLength: {
                  value: 256,
                  message: "Comment must be less than 256 characters",
                },
              })}
              className={`w-full p-2 border ${
                errors.comment ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.comment ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Write your comment..."
            />
          </Form.Control>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </Form.Field>
      </div>
      <Form.Submit asChild>
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addStatus === "loading" ? "Posting..." : "Post"}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default CommentForm;
