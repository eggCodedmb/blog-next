"use server";

import { prisma } from "../prisma";
import { getUser } from "../user/user.action";

export async function createComment(postId: number, content: string) {
  const user = await getUser();
  if (!user) {
    throw new Error("未登录");
  }

  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error("评论不能为空");
  }

  const comment = await prisma.comment.create({
    data: {
      content: trimmed,
      postId,
      authorId: user.id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });

  return comment;
}

export async function deleteComment(commentId: number) {
  const user = await getUser();
  if (!user) {
    throw new Error("未登录");
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { authorId: true },
  });

  if (!comment || comment.authorId !== user.id) {
    throw new Error("无权限删除");
  }

  await prisma.comment.delete({ where: { id: commentId } });
  return { success: true };
}
