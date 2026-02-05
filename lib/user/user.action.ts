"use server";

import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function userById(id: number, email?: string) {
  const where = email ? { id, email } : { id };
  const user = await prisma.user.findUnique({ where });
  if (!user) throw new Error("用户不存在");
  return user;
}

export async function userList() {
  const users = await prisma.user.findMany();
  return users;
}

export async function updateUser(
  id: number,
  data: { name?: string; avatar?: string },
) {
  const user = await prisma.user.update({ where: { id }, data });
  return user;
}

export async function getUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    return await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true, avatar: true },
    });
  } catch {
    return null;
  }
}

// logout
export async function logout() {
  (await cookies()).set("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return { message: "退出登录成功" };
}
