import { PostCard } from "../PostCard";
import "./style.css";
export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post, index) => (
      <PostCard
        key={index}
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
      />
    ))}
  </div>
);
