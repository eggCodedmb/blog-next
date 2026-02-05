"use client";

export default function LoadingSpinner({
  label = "加载中...",
  size = "md",
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-5 w-5 border-2",
    lg: "h-6 w-6 border-[3px]",
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-theme border-t-transparent`}
        aria-hidden
      />
      <span>{label}</span>
    </div>
  );
}
