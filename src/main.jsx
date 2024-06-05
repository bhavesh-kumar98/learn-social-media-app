import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/CreatePost.jsx";
import PostList from "./components/PostList.jsx";

const router = createBrowserRouter([
  {
    path: "/learn-social-media-app/",
    element: <App />,
    children: [
      { path: "/learn-social-media-app/", element: <PostList /> },
      { path: "/learn-social-media-app/create-post", element: <CreatePost /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
