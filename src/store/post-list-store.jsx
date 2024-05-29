import { createContext, useCallback, useEffect, useReducer, useState } from "react";

export const PostListContext = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = [...action.payload.posts, ...currPostList];
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    const addPostActionObj = {
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        userId: userId,
        title: postTitle,
        body: postBody,
        tags: tags,
        reactions: reactions,
      },
    };
    dispatchPostList(addPostActionObj);
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = useCallback((postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  }, [dispatchPostList]);

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostListContext.Provider
      value={{ fetching, postList, addPost, deletePost }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
