import {
  CommentsState,
  CommentType,
  NewCommentType,
} from "./../../types/commentTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCommentAPI,
  deleteCommentAPI,
  fetchCommentsAPI,
} from "./commentsAPI";

const initialState: CommentsState = {
  comments: [],
  removedCommentIds: JSON.parse(
    localStorage.getItem("removedCommentIds") || "[]"
  ),
  fetchStatus: "idle",
  addStatus: "idle",
  deleteStatus: "idle",
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetchCommentsAPI();
    return response.filter(
      (comment: CommentType) =>
        !initialState.removedCommentIds.includes(comment.id)
    );
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (newComment: NewCommentType, { rejectWithValue }) => {
    try {
      const response = await addCommentAPI(newComment);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteCommentAPI(id);
      const removedCommentIds = JSON.parse(
        localStorage.getItem("removedCommentIds") || "[]"
      );
      removedCommentIds.push(id);
      localStorage.setItem(
        "removedCommentIds",
        JSON.stringify(removedCommentIds)
      );
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch comments
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.fetchStatus = "succeeded";
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchStatus = "failed";
    });

    // Add comment
    builder.addCase(addComment.pending, (state) => {
      state.addStatus = "loading";
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.addStatus = "succeeded";
      state.comments = [action.payload, ...state.comments];
    });
    builder.addCase(addComment.rejected, (state) => {
      state.addStatus = "failed";
    });

    // Delete comment
    builder.addCase(deleteComment.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.deleteStatus = "succeeded";
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.meta.arg
      );
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.deleteStatus = "failed";
    });
  },
});

export default commentsSlice.reducer;
