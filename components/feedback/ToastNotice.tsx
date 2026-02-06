"use client";

import { useEffect } from "react";

export default function ToastNotice({
  open,
  message,
  variant = "success",
  onClose,
  duration = 2200,
  position = "top-center",
}: {
  open: boolean;
  message: string;
  variant?: "success" | "error";
  onClose: () => void;
  duration?: number;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "top-right"
    | "top-left";
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

  const positionClass =
    position === "bottom-right"
      ? "right-6 bottom-6"
      : position === "bottom-left"
        ? "left-6 bottom-6"
        : position === "top-right"
          ? "right-6 top-6"
          : position === "top-left"
            ? "left-6 top-6"
            : "left-1/2 top-6 -translate-x-1/2";

  return (
    <div className={`fixed z-50 ${positionClass}`}>
      <div
        className={`rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur ${tone}`}
        role="status"
      >
        {message}
      </div>
    </div>
  );
}
