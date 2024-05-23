import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {

  if(action.type === "ADD_POST") {
    // logic with payload
  }
  return currPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    STATIC_POST_DATA
  );

  const addPost = () => { 
    const addPostActionObj = {
      type: "ADD_POST",
      payload: {
        value1,
        value2,
      }
    };
    dispatchPostList(addPostActionObj);
  };

  const deletePost = () => {};

  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

// dummy data
const STATIC_POST_DATA = [
  {
    id: "1",
    userId: 1,
    title: "TITLE 1",
    body: " never looked down oe him change his mind.",
    tags: ["history", "crime"],
    reactions: 2,
  },
  {
    id: "2",
    userId: 2,
    title: "TITLE 2",
    body: "His mohan him. But tup of people he was talking to made him change his mind.",
    tags: ["dfhdh dfh ", "american"],
    reactions: 8,
  },
  {
    id: "3",
    userId: 3,
    title: "TITLE 3",
    body: "to made him change his mind.",
    tags: ["dfgh", "fghf fgh", "fgh"],
    reactions: 9,
  },
];

export default PostListProvider;
