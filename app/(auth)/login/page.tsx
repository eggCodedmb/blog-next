import Auth from "@/components/auth/Auth";
import { loginService, registerService } from "@/lib/auth";
export default function Login() {
  type ActionResult = { ok: true } | { ok: false; message: string };
  // ✅ 登录提交
  const handleLogin = async (formData: FormData) => {
    "use server";
    try {
      await loginService({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      return { ok: true } satisfies ActionResult;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "登录失败，请稍后再试";
      return { ok: false, message } satisfies ActionResult;
    }
  };

  // ✅ 注册提交
  const handleRegister = async (formData: FormData) => {
    "use server";
    try {
      await registerService({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      });
      return { ok: true } satisfies ActionResult;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "注册失败，请稍后再试";
      return { ok: false, message } satisfies ActionResult;
    }
  };

  return (
    <div>
      <Auth onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
}
