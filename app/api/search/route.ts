import { NextResponse } from "next/server";
import MiniSearch from "minisearch";
import { prisma } from "@/lib/prisma";

type SearchDoc = {
  id: number;
  title: string;
  content: string;
  authorName: string | null;
  createdAt: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim();
  const limit = Math.min(Number(searchParams.get("limit") || 8), 20);

  if (!query) {
    return NextResponse.json({ query, results: [] });
  }

  const posts = await prisma.post.findMany({
    where: { published: "1" },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const docs: SearchDoc[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: stripHtml(post.content ?? ""),
    authorName: post.author?.name ?? null,
    createdAt: post.createdAt.toISOString(),
  }));

  const search = new MiniSearch<SearchDoc>({
    fields: ["title", "content"],
    storeFields: ["id", "title", "content", "authorName", "createdAt"],
    searchOptions: {
      boost: { title: 3 },
      prefix: true,
      fuzzy: 0.2,
    },
  });

  search.addAll(docs);

  const docMap = new Map(docs.map((doc) => [doc.id, doc]));
  const hits = search.search(query).slice(0, limit);

  const results = hits.map((hit) => {
    const doc = docMap.get(hit.id);
    const snippet = doc?.content
      ? doc.content.replace(/\s+/g, " ").slice(0, 120)
      : "";

    return {
      id: hit.id,
      title: doc?.title ?? hit.id.toString(),
      snippet,
      authorName: doc?.authorName ?? null,
      createdAt: doc?.createdAt ?? null,
    };
  });

  return NextResponse.json({ query, results });
}
