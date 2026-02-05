"use server";

import { prisma } from "../prisma";
import { getUser } from "../user/user.action";

export async function toggleFavorite(postId: number) {
  const user = await getUser();
  if (!user) {
    throw new Error("未登录");
  }

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId,
      },
    },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { favorited: false };
  }

  await prisma.favorite.create({
    data: {
      userId: user.id,
      postId,
    },
  });

  return { favorited: true };
}
