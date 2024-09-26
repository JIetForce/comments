import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../../features/comments/commentsSlice";
import CommentList from "../CommentList/CommentList";
import * as API from "../../features/comments/commentsAPI";
import { CommentsState } from "../../types/commentTypes";

jest.mock("../../features/comments/commentsAPI");

const createMockStore = (preloadedState: { comments: CommentsState }) => {
  return configureStore({
    reducer: { comments: commentsReducer },
    preloadedState,
  });
};

describe("Comment", () => {
  const initialComments = [
    {
      id: 1,
      body: "First comment",
      postId: 1,
      likes: 2,
      user: { username: "user1", fullName: "User One", id: 1 },
    },
    {
      id: 2,
      body: "Second comment",
      postId: 2,
      likes: 3,
      user: { username: "user2", fullName: "User Two", id: 2 },
    },
  ];

  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      comments: {
        comments: initialComments,
        fetchStatus: "succeeded",
        deleteStatus: "idle",
        addStatus: "idle",
      },
    });
  });

  test("deletes a comment successfully", async () => {
    (API.deleteCommentAPI as jest.Mock).mockResolvedValue(1);

    render(
      <Provider store={store}>
        <CommentList />
      </Provider>
    );

    expect(screen.getByText("First comment")).toBeInTheDocument();

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    await waitFor(() =>
      expect(screen.queryByText("First comment")).not.toBeInTheDocument()
    );

    const commentsState = store.getState().comments.comments;
    expect(commentsState).toHaveLength(1);
    expect(commentsState[0].body).toBe("Second comment");
  });

  test("handles error when deleting a comment fails", async () => {
    (API.deleteCommentAPI as jest.Mock).mockRejectedValue(
      new Error("Failed to delete comment")
    );

    render(
      <Provider store={store}>
        <CommentList />
      </Provider>
    );

    expect(screen.getByText("First comment")).toBeInTheDocument();

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    const commentsState = store.getState().comments.comments;
    expect(commentsState).toHaveLength(2);
  });
});
