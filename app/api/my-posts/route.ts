import { NextResponse } from "next/server";
import { getUser } from "@/lib/user/user.action";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: "用户未登录" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Math.min(Number(searchParams.get("pageSize") || 10), 50);

  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
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

  return NextResponse.json(posts);
}
