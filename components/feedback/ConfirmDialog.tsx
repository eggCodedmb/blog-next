"use client";

export default function ConfirmDialog({
  open,
  title = "确认提交",
  description = "提交后将无法撤销，是否继续？",
  confirmText = "确定",
  cancelText = "取消",
  onConfirm,
  onCancel,
  loading = false,
  children,
}: {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="关闭"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-theme bg-card p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-theme">{title}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
        {children ? <div className="mt-4">{children}</div> : null}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="btn btn-primary hover:opacity-90"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "提交中..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
