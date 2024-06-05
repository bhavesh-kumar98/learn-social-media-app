import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost, addPostMethodPost } = useContext(PostListContext);
  const navigate = useNavigate();

  const userIdElem = useRef();
  const postTitleElem = useRef();
  const postBodyElem = useRef();
  const likesElem = useRef();
  const dislikesElem = useRef();
  const tagsElem = useRef();

  const handleDirectSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElem.current.value;
    const postTitle = postTitleElem.current.value;
    const postBody = postBodyElem.current.value;
    const likes = likesElem.current.value;
    const dislikes = dislikesElem.current.value;
    const tags = tagsElem.current.value.split(" ");

    userIdElem.current.value = "";
    postTitleElem.current.value = "";
    postBodyElem.current.value = "";
    likesElem.current.value = "";
    dislikesElem.current.value = "";
    tagsElem.current.value = "";

    addPost(userId, postTitle, postBody, likes, dislikes, tags);
    navigate("/learn-social-media-app/");
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElem.current.value;
    const postTitle = postTitleElem.current.value;
    const postBody = postBodyElem.current.value;
    const likes = likesElem.current.value;
    const dislikes = dislikesElem.current.value;
    const tags = tagsElem.current.value.split(" ");

    userIdElem.current.value = "";
    postTitleElem.current.value = "";
    postBodyElem.current.value = "";
    likesElem.current.value = "";
    dislikesElem.current.value = "";
    tagsElem.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        title: postTitle,
        body: postBody,
        tags: tags,
        reactions: {
          likes: likes,
          dislikes: dislikes,
        },
      }),
    })
      .then((res) => res.json())
      .then((post) => addPostMethodPost(post));
    navigate("/learn-social-media-app/");
  };

  return (
    <form className="create-post" onSubmit={handlePostSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your User Id here
        </label>
        <input
          type="text"
          ref={userIdElem}
          className="form-control"
          id="userId"
          placeholder="Your User Id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElem}
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBodyElem}
          rows={"4"}
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of likes <AiFillLike />
        </label>
        <input
          type="text"
          ref={likesElem}
          className="form-control"
          id="reactions"
          placeholder="How many people like to this post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of dislikes <AiFillDislike />
        </label>
        <input
          type="text"
          ref={dislikesElem}
          className="form-control"
          id="reactions"
          placeholder="How many people dislike to this post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          ref={tagsElem}
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space"
        />
      </div>
      <button type="submit" className="btn btn-primary buttons">
        Post Submit
      </button>
      <button
        type="submit"
        onClick={handleDirectSubmit}
        className="btn btn-primary buttons"
      >
        Direct Submit
      </button>
    </form>
  );
};

export default CreatePost;
