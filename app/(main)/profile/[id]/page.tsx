import UserCard from "@/components/user/UserCard";
import { userById } from "@/lib/user/user.action";
import { getPostByAuthorId } from "@/lib/post/post.action";
// import { use } from "react";
// import PostCard from "@/components/post/PostCard";
import PostList from "@/components/post/PostList";

async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await userById(Number(id));
  const posts = await getPostByAuthorId(Number(id), {
    page: 1,
    pageSize: 20,
    createdAt: "desc",
  });
  console.log(user);
  console.log(posts);
  if (!user) {
    return null;
  }
  return (
    <div className="w-3xl">
      <UserCard
        name={user.name || ""}
        email={user.email}
        avatar={user.avatar}
      />
      {posts.length > 0 && (
        <div className="mt-4">
          <PostList posts={posts} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
