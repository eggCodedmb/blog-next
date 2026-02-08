"use server";
import { prisma } from "../prisma";
import { PageParams } from "@/types/page";
export interface CreatePostParams {
  authorId: number;
  title: string;
  content: string | null;
  published?: string;
  cover: string;
}
export async function createPost(post: CreatePostParams) {
  const res = await prisma.post.create({
    data: post,
  });
  return res;
}

export async function getPostAll(data: PageParams) {
  const { page = 1, pageSize = 10 } = data;
  const posts = await prisma.post.findMany({
    where: { published: "1" },
    orderBy: { createdAt: data.createdAt || "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      // 字段选择
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          comments: true,
          favorites: true,
        },
      },
    },
  });
  return posts;
}

export async function getPostById(id: number) {
  const post = await prisma.post.findMany({
    where: { id },
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
  return post[0];
}

export async function getPostDetail(id: number, viewerId?: number) {
  const include: Record<string, unknown> = {
    author: {
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    },
    comments: {
      orderBy: { createdAt: "desc" },
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
    },
    _count: {
      select: {
        comments: true,
        favorites: true,
      },
    },
  };

  if (viewerId) {
    include.favorites = {
      where: { userId: viewerId },
      select: { id: true },
    };
  }

  const post = await prisma.post.findUnique({
    where: { id },
    include,
  });

  return post;
}

// 删除文章
export async function deletePost(id: number) {
  const res = await prisma.post.delete({
    where: { id },
  });
  return res;
}

// 更新文章
export async function updatePost(id: number, post: CreatePostParams) {
  const res = await prisma.post.update({
    where: { id },
    data: post,
  });
  return res;
}

// 该用户的所有文章
export async function getPostByAuthorId(id: number, data: PageParams) {
  const { page = 1, pageSize = 10 } = data;
  const posts = await prisma.post.findMany({
    where: { authorId: id },
    orderBy: { createdAt: data.createdAt || "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
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
  return posts;
}

// 待审核文章
export async function getPendingPosts() {
  const posts = await prisma.post.findMany({
    where: { published: "0" },
    orderBy: { createdAt: "desc" },
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
  return posts;
}

export async function getReviewPosts(
  status: "0" | "1" | "2",
  page = 1,
  pageSize = 10,
) {
  const posts = await prisma.post.findMany({
    where: { published: status },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
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
  return posts;
}

export async function getReviewCount(
  status: "0" | "1" | "2",
) {
  return prisma.post.count({
    where: { published: status },
  });
}

// 审核通过
export async function approvePost(id: number) {
  const res = await prisma.post.update({
    where: { id },
    data: { published: "1" },
  });
  return res;
}

// 审核不通过
export async function rejectPost(id: number) {
  const res = await prisma.post.update({
    where: { id },
    data: { published: "2" },
  });
  return res;
}
