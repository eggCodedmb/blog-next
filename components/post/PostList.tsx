import { PostItemProps } from "@/types/post";
import PostCard from "./PostCard";

function PostList({ posts }: { posts: PostItemProps[] }) {
  if (!posts.length) {
    return <div className="text-center py-20 text-muted">暂无文章 ✍️</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
