import * as Avatar from "@radix-ui/react-avatar";
import * as Label from "@radix-ui/react-label";

function UserCard({
  name,
  email,
  avatar,
  postCount,
}: {
  name: string;
  email: string;
  avatar?: string;
  postCount?: number;
}) {
  return (
    <div className="w-full rounded-2xl border border-theme bg-card shadow-sm overflow-hidden">
      <div className="h-24 sm:h-28 bg-[linear-gradient(135deg,var(--bg-2),var(--card-2))]" />
      <div className="-mt-10 sm:-mt-12 px-5 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar.Root className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-theme bg-card">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={avatar || ""}
                alt={name || ""}
              />
            </Avatar.Root>
            <div className="min-w-0">
              <Label.Root className="block text-lg sm:text-xl font-semibold text-theme truncate">
                {name || "匿名用户"}
              </Label.Root>
              <Label.Root className="block text-sm text-muted truncate">
                {email || ""}
              </Label.Root>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted">
            <div className="flex flex-col items-start">
              <span className="text-theme font-semibold">
                {postCount ?? 0}
              </span>
              <span>文章</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
