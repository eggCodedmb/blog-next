"use server";

import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
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
  data: {
    name?: string;
    avatar?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  },
) {
  const { currentPassword, newPassword, confirmPassword, ...profile } = data;
  const updates: { name?: string; avatar?: string; password?: string } = {
    ...profile,
  };

  if (currentPassword || newPassword || confirmPassword) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error("请完整填写密码信息");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("两次密码不一致");
    }
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("用户不存在");
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new Error("当前密码不正确");
    updates.password = await bcrypt.hash(newPassword, 10);
  }

  const user = await prisma.user.update({ where: { id }, data: updates });
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
      select: { id: true, name: true, email: true, avatar: true, isAdmin: true },
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
  return { success: true };
}
