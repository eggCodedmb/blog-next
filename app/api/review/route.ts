import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/user/user.action";

type ReviewStatus = "0" | "1" | "2";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ message: "无权限" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");
  const status: ReviewStatus =
    statusParam === "0" || statusParam === "1" || statusParam === "2"
      ? statusParam
      : "0";
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Math.min(Number(searchParams.get("pageSize") || 10), 50);

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

  return NextResponse.json(posts);
}
