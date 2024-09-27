export type User = {
  id: number;
  fullName: string;
  username: string;
};

export type CommentType = {
  id: number;
  body: string;
  likes: number;
  postId: number;
  user: User;
};

export type NewCommentType = {
  body: string;
  postId: number;
  userId: number;
};

export type CommentsState = {
  comments: CommentType[];
  removedCommentIds: number[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
};
