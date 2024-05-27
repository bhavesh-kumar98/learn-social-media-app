import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

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

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostListContext.Provider
      value={{ postList, addPost, addInitialPosts, deletePost }}
    >
      {children}
    </PostListContext.Provider>
  );
};

// dummy data
// const STATIC_POST_DATA = [
//   {
//     id: "1",
//     userId: 1,
//     title: "TITLE 1",
//     body: " never looked down oe him change his mind.",
//     tags: ["history", "crime"],
//     reactions: 2,
//   },
//   {
//     id: "2",
//     userId: 2,
//     title: "TITLE 2",
//     body: "His mohan him. But tup of people he was talking to made him change his mind.",
//     tags: ["dfhdh dfh ", "american"],
//     reactions: 8,
//   },
//   {
//     id: "3",
//     userId: 3,
//     title: "TITLE 3",
//     body: "to made him change his mind.",
//     tags: ["dfgh", "fghf fgh", "fgh"],
//     reactions: 9,
//   },
// ];

export default PostListProvider;
