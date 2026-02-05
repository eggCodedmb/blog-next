import { PostItemProps } from "@/types/post";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
function Content({ post }: { post: PostItemProps }) {
  return (
    <div className="w-3xl bg-card border border-theme p-6 rounded-md card-glow">
      <h1 className="text-3xl font-bold mb-8 text-theme font-display">
        {post?.title || ""}
      </h1>
      <div className="text-sm text-muted mb-3 line-clamp-2">
        <Link href={`/profile/${post.author?.id}`}>
          <div className="flex items-center">
            <Avatar.Root className="w-15 h-15 rounded-full">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={post.author?.avatar || ""}
                alt={post.author?.name || ""}
              />
            </Avatar.Root>
            <div className="flex">
              <b className="ml-2 text-theme">{post.author?.name || ""}</b>
              <span className="text-muted ml-2">
                {post.createdAt?.toLocaleString()}
              </span>
            </div>
          </div>
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post.content as string }}
        suppressHydrationWarning={true}
      ></div>
    </div>
  );
}

export default Content;
