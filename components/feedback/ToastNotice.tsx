"use client";

import { useEffect } from "react";

export default function ToastNotice({
  open,
  message,
  variant = "success",
  onClose,
  duration = 2200,
}: {
  open: boolean;
  message: string;
  variant?: "success" | "error";
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, onClose, duration]);

  if (!open) return null;

  const tone =
    variant === "success"
      ? "border-emerald-300/40 text-emerald-100 bg-emerald-500/15"
      : "border-rose-300/40 text-rose-100 bg-rose-500/15";

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div
        className={`rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur ${tone}`}
        role="status"
      >
        {message}
      </div>
    </div>
  );
}
