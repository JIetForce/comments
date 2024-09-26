import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

describe("App", () => {
  test("renders App component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Some Content/i)).toBeInTheDocument();
  });
});
