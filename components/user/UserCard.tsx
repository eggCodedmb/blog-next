import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import * as Label from "@radix-ui/react-label";
import { Pencil } from "lucide-react";

function UserCard({
  name,
  email,
  avatar,
  editHref,
}: {
  name: string;
  email: string;
  avatar?: string;
  postCount?: number;
  editHref?: string;
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

          <div className="flex items-center gap-4 text-sm text-muted">
            {editHref && (
              <Link
                href={editHref}
                className="inline-flex items-center gap-1.5 rounded-lg border border-theme px-3 py-1.5 text-xs font-medium text-theme transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Pencil className="size-3.5" />
                编辑资料
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
