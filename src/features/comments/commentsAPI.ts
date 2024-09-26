import { NewCommentType } from "../../types/commentTypes";

const API_URL = "https://dummyjson.com/comments";

export const fetchCommentsAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  const data = await response.json();
  return data.comments;
};

export const addCommentAPI = async (comment: NewCommentType) => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  const data = await response.json();
  return data;
};

export const deleteCommentAPI = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }

  return id;
};

export const updateCommentAPI = async (
  id: number,
  comment: {
    body: string;
    userId: number;
    postId: number;
  }
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error("Failed to update comment");
  }

  const data = await response.json();
  return data;
};
