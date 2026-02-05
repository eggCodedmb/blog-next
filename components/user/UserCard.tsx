import * as Avatar from "@radix-ui/react-avatar";
import * as Label from "@radix-ui/react-label";

function UserCard({
  name,
  email,
  avatar,
}: {
  name: string;
  email: string;
  avatar?: string;
}) {
  return (
    <div className="w-3xl bg-card border border-theme p-6 rounded-md card-glow">
      <div className="text-sm text-theme mb-3 line-clamp-2">
        <div className="flex items-center justify-center gap-3">
          <Avatar.Root className="w-50 h-50 rounded-full">
            <Avatar.Image
              className="size-full rounded-[inherit] object-cover"
              src={avatar || ""}
              alt={name || ""}
            />
          </Avatar.Root>
          <div className="flex flex-col items-start">
            <Label.Root className="ml-2 text-lg font-bold">
              昵称：{name || ""}
            </Label.Root>
            <Label.Root className="ml-2 text-muted">
              邮箱：{email || ""}
            </Label.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
