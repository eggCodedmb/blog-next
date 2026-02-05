import Image from "next/image";
import { PostItemProps } from "@/types/post";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
// import * as AspectRatio from "@radix-ui/react-aspect-ratio";

export default function PostCard({ post }: { post: PostItemProps }) {
  return (
    <article className="bg-card rounded-xl border border-theme p-5 hover:shadow-md transition-shadow card-glow">
      <Link href={`/content/${post.id}`}>
        <div className="w-full overflow-hidden rounded-md shadow-[0_2px_10px]">
          {/* <AspectRatio.Root ratio={16 / 7}>
            <Image
              src="/assets/tsxt.webp"
              alt={post.title}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 100vw"
              className="w-auto h-auto max-w-full rounded-xl"
            />
          </AspectRatio.Root> */}
        </div>
        <h3 className="text-lg font-semibold text-theme mb-2 font-display">
          {post.title}
        </h3>
        <div
          className="text-sm text-muted mb-3 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content as string }}
          suppressHydrationWarning={true}
        ></div>

        <div className="flex items-center justify-between text-sm text-muted">
          <div className="flex items-center gap-2">
            <Avatar.Root className="w-10 h-10 rounded-full">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={post.author?.avatar || ""}
                alt={post.author?.name || ""}
              />
            </Avatar.Root>
            {/* <AspectRatio.Root ratio={16 / 9}>
            <Image
              src="/assets/user.svg"
              alt={post.author.name || post.author.email}
              width={28}
              height={28}
              className="rounded-full"
            />
          </AspectRatio.Root> */}
            <span className="text-theme">
              {post.author.name || post.author.email}
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <Image
              src="/assets/like.svg"
              alt={post.author.name || post.author.email}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>{post._count?.favorites || 0}</span>
            <Image
              src="/assets/reply.svg"
              alt={post.author.name || post.author.email}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>{post._count?.comments || 0}</span>
            <span>
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : ""}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
