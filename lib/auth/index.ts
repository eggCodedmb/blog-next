import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const loginService = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("邮箱或密码错误");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("邮箱或密码错误");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  const cookieOptions = {
    httpOnly: true, // 只能通过 HTTP 访问
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: "/", // 所有路径都可以访问
  };

  // 设置 cookie
   (await cookies()).set("token", token, cookieOptions);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
};

const registerService = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { name, email, password, confirmPassword } = data;

  if (!name || !email || !password) throw new Error("参数不完整");
  if (password !== confirmPassword) throw new Error("两次密码不一致");

  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) throw new Error("邮箱已被注册");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      avatar: "https://avatar.vercel.sh/avatar.png",
    },
  });
  return { id: user.id, email: user.email };
};

export { loginService, registerService };
