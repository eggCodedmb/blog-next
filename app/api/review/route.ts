import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/user/user.action";

const STATUS_MAP = {
  pending: ["0", "false"],
  approved: ["1", "true"],
  rejected: ["2"],
} as const;

type ReviewStatus = keyof typeof STATUS_MAP;

export async function GET(request: Request) {
  const user = await getUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ message: "无权限" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") || "pending") as ReviewStatus;
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Math.min(Number(searchParams.get("pageSize") || 10), 50);

  const published = STATUS_MAP[status] ?? STATUS_MAP.pending;

  const posts = await prisma.post.findMany({
    where: { published: { in: published } },
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
