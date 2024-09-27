import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../../features/comments/commentsSlice";
import CommentForm from "./CommentForm";
import * as API from "../../features/comments/commentsAPI";
import { CommentsState } from "../../types/commentTypes";

jest.mock("../../features/comments/commentsAPI");

const createMockStore = (preloadedState: { comments: CommentsState }) => {
  return configureStore({
    reducer: { comments: commentsReducer },
    preloadedState,
  });
};

describe("CommentForm", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      comments: {
        comments: [],
        removedCommentIds: [],
        fetchStatus: "idle",
        addStatus: "idle",
        deleteStatus: "idle",
      },
    });
  });

  test("adds a comment successfully", async () => {
    const newComment = {
      body: "New comment",
      postId: 4,
      userId: 1,
    };

    (API.addCommentAPI as jest.Mock).mockResolvedValue(newComment);

    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText("Write your comment...");
    fireEvent.change(textarea, { target: { value: "New comment" } });

    const postButton = screen.getByText("Post");
    fireEvent.click(postButton);

    await waitFor(() =>
      expect(screen.queryByText("Posting...")).not.toBeInTheDocument()
    );

    const commentsState = store.getState().comments.comments;
    expect(commentsState).toHaveLength(1);
    expect(commentsState[0].body).toBe("New comment");
  });

  test("handles error when adding a comment fails", async () => {
    (API.addCommentAPI as jest.Mock).mockRejectedValue(
      new Error("Failed to add comment")
    );

    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText("Write your comment...");
    fireEvent.change(textarea, { target: { value: "New comment" } });

    const postButton = screen.getByText("Post");
    fireEvent.click(postButton);

    await waitFor(() => expect(textarea).toBeInTheDocument());
  });
});
