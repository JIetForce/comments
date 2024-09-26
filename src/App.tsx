import React from "react";
import CommentList from "./components/CommentList/CommentList";
import CommentForm from "./components/CommentForm/CommentForm";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <div className="App min-h-screen">
      <div className="p-4 max-w-xl mx-auto flex flex-col items-center gap-6">
        <div>Some Content</div>
        <CommentForm />
        <CommentList />
      </div>

      {/* Toast Notification */}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
