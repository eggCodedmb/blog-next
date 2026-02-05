import Auth from "@/components/auth/Auth";
import { loginService, registerService } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Login() {
  // ✅ 登录提交
  const handleLogin = async (formData: FormData) => {
    "use server";
    const res = await loginService({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    if (res) {
      redirect("/");
    }
  };

  // ✅ 注册提交
  const handleRegister = async (formData: FormData) => {
    "use server";
    const res = await registerService({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    });
    console.log(res);
    if (res) {
      // redirect("/");
    }
  };

  return (
    <div>
      <Auth onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
}
