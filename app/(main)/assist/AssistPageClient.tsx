"use client";

import { useEffect, useState } from "react";
import AssistPublishForm from "@/components/assist/AssistPublishForm";
import AssistGrid from "@/components/assist/AssistGrid";
import ToastNotice from "@/components/feedback/ToastNotice";
import { getAssistItems } from "@/lib/assist/assist.storage";
import { AssistItem } from "@/types/assist";

export default function AssistPageClient() {
  const [items, setItems] = useState<AssistItem[]>([]);
  const [openPublish, setOpenPublish] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    setItems(getAssistItems());
  }, []);

  return (
    <section className="w-full max-w-6xl px-4 py-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-theme">助力列表</h2>
        <button type="button" className="btn btn-primary" onClick={() => setOpenPublish(true)}>
          发布助力
        </button>
      </div>

      <AssistGrid items={items} />

      {openPublish ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="关闭发布助力弹窗"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenPublish(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-theme bg-card p-5 sm:p-6 shadow-xl">
            <AssistPublishForm
              onCreated={(item) => {
                setItems((prev) => [item, ...prev]);
                setOpenPublish(false);
                setToastOpen(true);
              }}
              onCancel={() => setOpenPublish(false)}
            />
          </div>
        </div>
      ) : null}

      <ToastNotice
        open={toastOpen}
        message="发布成功"
        variant="success"
        onClose={() => setToastOpen(false)}
      />
    </section>
  );
}
