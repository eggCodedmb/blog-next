import UserEdit from "@/components/user/UserEdit";
import { getUser } from "@/lib/user/user.action";
import { use } from "react";
function EditProfilePage() {
  const user = use(getUser());
  if (!user) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center text-muted">
        请先登录后查看
      </div>
    );
  }
  return (
    <UserEdit
      id={user.id}
      email={user.email}
      name={user.name}
      avatar={user.avatar}
    />
  );
}

export default EditProfilePage;
