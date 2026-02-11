"use client";

import { useMemo, useState } from "react";
import type { Extensions } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import { Markdown, MarkdownManager } from "@tiptap/markdown";
import { StarterKit } from "@tiptap/starter-kit";

type PreviewMode = "html" | "markdown";

interface ArticleContentPreviewProps {
  html?: string | null;
  markdown?: string | null;
  defaultMode?: PreviewMode;
  emptyText?: string;
  className?: string;
  hideBtn?:boolean;
}

const PREVIEW_EXTENSIONS: Extensions = [StarterKit, Markdown];

function ArticleContentPreview({
  html,
  markdown,
  defaultMode,
  emptyText = "暂无可预览内容",
  className,
  hideBtn=true
}: ArticleContentPreviewProps) {
  const hasHtml = Boolean(html?.trim());
  const hasMarkdown = Boolean(markdown?.trim());

  const [mode, setMode] = useState<PreviewMode>(
    defaultMode ?? (hasHtml ? "html" : "markdown"),
  );

  const effectiveMode: PreviewMode =
    mode === "html" && !hasHtml && hasMarkdown
      ? "markdown"
      : mode === "markdown" && !hasMarkdown && hasHtml
        ? "html"
        : mode;

  const markdownHtml = useMemo(() => {
    const source = markdown?.trim();
    if (!source) return "";

    try {
      const manager = new MarkdownManager({
        extensions: PREVIEW_EXTENSIONS,
      });
      const json = manager.parse(source);
      return generateHTML(json, PREVIEW_EXTENSIONS);
    } catch {
      return "";
    }
  }, [markdown]);

  const previewHtml =
    effectiveMode === "markdown" ? markdownHtml : (html?.trim() ?? "");

  const containerClassName = [
    "w-full rounded-2xl border border-theme bg-card p-4 sm:p-6 card-glow",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={containerClassName}>
      <div className="mb-4 flex flex-wrap items-center gap-2" hidden={hideBtn}>
        <button
          type="button"
          className={`btn ${
            effectiveMode === "html" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setMode("html")}
          disabled={!hasHtml}
        >
          HTML 预览
        </button>
        <button
          type="button"
          className={`btn ${
            effectiveMode === "markdown" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setMode("markdown")}
          disabled={!hasMarkdown}
        >
          Markdown 预览
        </button>
      </div>

      {previewHtml ? (
        <article
          className="tiptap text-theme text-sm sm:text-base leading-relaxed wrap-break-word"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      ) : hasMarkdown && effectiveMode === "markdown" ? (
        <pre className="rounded-xl border border-theme bg-[color-mix(in_srgb,var(--card)_92%,transparent)] p-4 text-xs sm:text-sm text-theme overflow-auto whitespace-pre-wrap">
          {markdown}
        </pre>
      ) : (
        <p className="text-sm text-muted">{emptyText}</p>
      )}
    </section>
  );
}

export default ArticleContentPreview;
