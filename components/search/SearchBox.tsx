"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Input from "@/components/Input";

type SearchResult = {
  id: number;
  title: string;
  snippet: string;
  authorName: string | null;
  createdAt: string | null;
};

const EMPTY_RESULTS: SearchResult[] = [];

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>(EMPTY_RESULTS);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const trimmedQuery = useMemo(() => query.trim(), [query]);
  const highlightRegExp = useMemo(() => {
    if (!trimmedQuery) return null;
    const terms = trimmedQuery.split(/\s+/).filter(Boolean);
    if (terms.length === 0) return null;
    const pattern = terms.map(escapeRegExp).join("|");
    return new RegExp(`(${pattern})`, "gi");
  }, [trimmedQuery]);

  const renderHighlight = (text: string) => {
    if (!highlightRegExp || !text) return text;
    const parts = text.split(highlightRegExp);
    return parts.map((part, index) => {
      if (highlightRegExp.test(part)) {
        return (
          <span key={`${part}-${index}`} className="text-primary">
            {part}
          </span>
        );
      }
      return <span key={`${part}-${index}`}>{part}</span>;
    });
  };

  useEffect(() => {
    if (!trimmedQuery) {
      setResults(EMPTY_RESULTS);
      setOpen(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setResults(data.results || EMPTY_RESULTS);
        setOpen(true);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults(EMPTY_RESULTS);
          setOpen(true);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [trimmedQuery]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        placeholder="搜索文章标题或内容..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => {
          if (trimmedQuery) setOpen(true);
        }}
        icon={<Search size={16} />}
      />
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-surface border border-theme rounded-xl shadow-lg z-50 overflow-hidden">
          {loading && (
            <div className="px-4 py-3 text-sm text-muted">搜索中...</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted">
              没有找到相关内容
            </div>
          )}
          {!loading && results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/content/${item.id}`}
                  className="block px-4 py-3 hover:bg-[color-mix(in_srgb,var(--card)_85%,transparent)] transition"
                  onClick={() => setOpen(false)}
                >
                  <div className="text-sm font-semibold text-theme truncate">
                    {renderHighlight(item.title)}
                  </div>
                  {item.snippet && (
                    <div className="text-xs text-muted mt-1">
                      {renderHighlight(item.snippet)}
                    </div>
                  )}
                  <div className="text-xs text-muted mt-1 flex gap-2">
                    {item.authorName && <span>{item.authorName}</span>}
                    {item.createdAt && <span>{formatDate(item.createdAt)}</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
