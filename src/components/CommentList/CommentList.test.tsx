import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../../features/comments/commentsSlice";
import CommentList from "./CommentList";
import * as API from "../../features/comments/commentsAPI";
import { CommentsState } from "../../types/commentTypes";

jest.mock("../../features/comments/commentsAPI");

const createMockStore = (preloadedState: { comments: CommentsState }) => {
  return configureStore({
    reducer: { comments: commentsReducer },
    preloadedState,
  });
};

describe("CommentList", () => {
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
        comments: [],
        removedCommentIds: [],
        fetchStatus: "idle",
        deleteStatus: "idle",
        addStatus: "idle",
      },
    });
  });

  test("fetches and renders comments successfully", async () => {
    (API.fetchCommentsAPI as jest.Mock).mockResolvedValue(initialComments);

    render(
      <Provider store={store}>
        <CommentList />
      </Provider>
    );

    expect(screen.getByText(/loading comments/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading comments/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });

  test("handles error when fetching comments fails", async () => {
    (API.fetchCommentsAPI as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch comments")
    );

    render(
      <Provider store={store}>
        <CommentList />
      </Provider>
    );

    expect(screen.getByText(/loading comments/i)).toBeInTheDocument();

    expect(screen.queryByText("First comment")).not.toBeInTheDocument();
    expect(screen.queryByText("Second comment")).not.toBeInTheDocument();
  });
});
