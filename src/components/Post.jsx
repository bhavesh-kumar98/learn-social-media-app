import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

import { PostListContext } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);

  return (
    <div className="card post-card" style={{ width: "25rem" }}>
      <div className="card-body">
        <h6 className="card-title"> userId: {post.userId}</h6>
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span className="badge text-bg-primary hashtag">{tag}</span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {post.reactions.likes} people.
          <br />
          <div className="reactions-icon">
            <AiFillLike /> {post.reactions.likes} <AiFillDislike />{" "}
            {post.reactions.dislikes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
