"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Form from "@radix-ui/react-form";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import ToastNotice from "@/components/feedback/ToastNotice";

export default function Auth({
  onLogin,
  onRegister,
}: {
  onLogin: (formData: FormData) => Promise<{ ok: true } | { ok: false; message: string }>;
  onRegister: (formData: FormData) => Promise<{ ok: true } | { ok: false; message: string }>;
}) {
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    variant: "success" | "error";
  }>({ open: false, message: "", variant: "success" });

  // ✅ 登录提交
  const loginForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoggingIn(true);
    try {
      const res = await onLogin(formData);
      if (res.ok) {
        router.push("/");
      } else {
        setIsLoggingIn(false);
        setToast({ open: true, message: res.message, variant: "error" });
      }
    } catch (error) {
      setIsLoggingIn(false);
      setToast({
        open: true,
        message: error instanceof Error ? error.message : "登录失败，请稍后再试",
        variant: "error",
      });
      return;
    }
  };

  // ✅ 注册提交
  const registerForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await onRegister(formData);
      if (res.ok) {
        setToast({ open: true, message: "注册成功，请登录", variant: "success" });
        setTab("login");
      } else {
        setToast({ open: true, message: res.message, variant: "error" });
      }
    } catch (error) {
      setToast({
        open: true,
        message: error instanceof Error ? error.message : "注册失败，请稍后再试",
        variant: "error",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center p-6 text-white overflow-hidden">
      <ToastNotice
        open={toast.open}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
      <div className="absolute w-125 h-125 bg-purple-600/30 rounded-full blur-3xl -top-32 -left-32 animate-pulse" />
      <div className="absolute w-100 h-100 bg-cyan-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse" />

      <div className="relative w-full max-w-md">
        <AnimatePresence>
          {isLoggingIn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-black/60 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <p className="text-sm text-zinc-200">正在进入首页…</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">欢迎回来</h1>
          <p className="text-zinc-400 text-center mb-6">访问您的宇宙 ✨</p>

          <Tabs.Root value={tab} onValueChange={setTab}>
            <Tabs.List className="grid grid-cols-2 mb-6 bg-white/5 p-1 rounded-xl">
              <Tabs.Trigger
                value="login"
                className={`rounded-lg py-2 text-sm transition ${tab === "login" ? "bg-white text-black" : "text-zinc-400"}`}
              >
                Login
              </Tabs.Trigger>
              <Tabs.Trigger
                value="register"
                className={`rounded-lg py-2 text-sm transition ${tab === "register" ? "bg-white text-black" : "text-zinc-400"}`}
              >
                Register
              </Tabs.Trigger>
            </Tabs.List>

            <div className="relative min-h-75">
              <AnimatePresence mode="wait">
                {tab === "login" && (
                  <Form.Root key="login" onSubmit={loginForm} asChild>
                    <motion.form
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-4"
                    >
                      <Form.Field name="email">
                        <Form.Control asChild>
                          <Input
                            icon={<Mail size={18} />}
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                          />
                        </Form.Control>
                        <Form.Message
                          match="valueMissing"
                          className="text-red-400 text-xs"
                        >
                          请输入邮箱
                        </Form.Message>
                        <Form.Message
                          match="typeMismatch"
                          className="text-red-400 text-xs"
                        >
                          邮箱格式不正确
                        </Form.Message>
                      </Form.Field>

                      <Form.Field name="password">
                        <Form.Control asChild>
                          <Input
                            icon={<Lock size={18} />}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            minLength={6}
                            rightIcon={
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            }
                          />
                        </Form.Control>
                        <Form.Message
                          match="valueMissing"
                          className="text-red-400 text-xs"
                        >
                          请输入密码
                        </Form.Message>
                        <Form.Message
                          match="tooShort"
                          className="text-red-400 text-xs"
                        >
                          密码至少6位
                        </Form.Message>
                      </Form.Field>

                      <button
                        type="submit"
                        className="btn w-full mt-2 rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 py-2.5 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isLoggingIn}
                      >
                        {isLoggingIn ? "登录中..." : "登录"}
                      </button>
                    </motion.form>
                  </Form.Root>
                )}

                {tab === "register" && (
                  <Form.Root key="register" onSubmit={registerForm} asChild>
                    <motion.form
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-4"
                    >
                      <Form.Field name="name">
                        <Form.Control asChild>
                          <Input
                            icon={<User size={18} />}
                            name="name"
                            placeholder="Name"
                            required
                            minLength={2}
                          />
                        </Form.Control>
                        <Form.Message
                          match="valueMissing"
                          className="text-red-400 text-xs"
                        >
                          请输入昵称
                        </Form.Message>
                        <Form.Message
                          match="tooShort"
                          className="text-red-400 text-xs"
                        >
                          昵称至少2个字符
                        </Form.Message>
                      </Form.Field>

                      <Form.Field name="email">
                        <Form.Control asChild>
                          <Input
                            icon={<Mail size={18} />}
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                          />
                        </Form.Control>
                        <Form.Message
                          match="valueMissing"
                          className="text-red-400 text-xs"
                        >
                          请输入邮箱
                        </Form.Message>
                        <Form.Message
                          match="typeMismatch"
                          className="text-red-400 text-xs"
                        >
                          邮箱格式不正确
                        </Form.Message>
                      </Form.Field>

                      <Form.Field name="password">
                        <Form.Control asChild>
                          <Input
                            icon={<Lock size={18} />}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            minLength={6}
                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                            rightIcon={
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            }
                          />
                        </Form.Control>
                        <Form.Message
                          match="valueMissing"
                          className="text-red-400 text-xs"
                        >
                          请输入密码
                        </Form.Message>
                        <Form.Message
                          match="patternMismatch"
                          className="text-red-400 text-xs"
                        >
                          密码需包含字母和数字
                        </Form.Message>
                      </Form.Field>

                      <Form.Field name="confirmPassword">
                        <Form.Control asChild>
                          <Input
                            icon={<Lock size={18} />}
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            required
                            minLength={6}
                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                            rightIcon={
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            }
                          />
                        </Form.Control>
                        <Form.Message
                          match="patternMismatch"
                          className="text-red-400 text-xs"
                        >
                          确认密码需包含字母和数字
                        </Form.Message>
                        <Form.Message
                          match="valueMissing"
                          className="text-red-400 text-xs"
                        >
                          请输入确认密码
                        </Form.Message>
                      </Form.Field>

                      <button
                        type="submit"
                        className="btn w-full mt-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 py-2.5 hover:scale-[1.02]"
                      >
                        注册提交
                      </button>
                    </motion.form>
                  </Form.Root>
                )}
              </AnimatePresence>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
