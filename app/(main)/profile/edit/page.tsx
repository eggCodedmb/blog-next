import UserEdit from "@/components/user/UserEdit";
import { getUser } from "@/lib/user/user.action";
import { use } from "react";
function EditProfilePage() {
  const user = use(getUser());
  if (!user) {
    return null;
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
