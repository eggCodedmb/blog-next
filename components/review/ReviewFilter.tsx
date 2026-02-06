"use client";

import { useRouter } from "next/navigation";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, CheckCircle2, Filter } from "lucide-react";

type ReviewFilterProps = {
  value: "pending" | "approved" | "rejected";
};

export default function ReviewFilter({ value }: ReviewFilterProps) {
  const router = useRouter();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-theme bg-card px-3 py-1.5 shadow-sm">
      <span className="inline-flex items-center gap-1 text-xs text-muted">
        <Filter size={12} />
        状态
      </span>
      <Select.Root
        value={value}
        onValueChange={(next) => router.push(`/review?status=${next}`)}
      >
        <Select.Trigger className="inline-flex items-center gap-2 rounded-full border border-theme bg-[color-mix(in_srgb,var(--card)_92%,transparent)] px-3 py-1 text-sm text-theme outline-none transition hover:bg-[color-mix(in_srgb,var(--card)_85%,transparent)]">
          <Select.Value />
          <Select.Icon className="text-muted">
            <ChevronDown size={16} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-50 mt-2 overflow-hidden rounded-2xl border border-theme bg-card shadow-lg">
            <Select.Viewport className="p-1">
              <Select.Item
                value="pending"
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-theme outline-none data-highlighted:bg-[color-mix(in_srgb,var(--card)_85%,transparent)]"
              >
                <Select.ItemText>待审</Select.ItemText>
                <Select.ItemIndicator className="text-primary">
                  <CheckCircle2 size={16} />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item
                value="approved"
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-theme outline-none data-highlighted:bg-[color-mix(in_srgb,var(--card)_85%,transparent)]"
              >
                <Select.ItemText>已审核</Select.ItemText>
                <Select.ItemIndicator className="text-primary">
                  <CheckCircle2 size={16} />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item
                value="rejected"
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-theme outline-none data-highlighted:bg-[color-mix(in_srgb,var(--card)_85%,transparent)]"
              >
                <Select.ItemText>拒绝</Select.ItemText>
                <Select.ItemIndicator className="text-primary">
                  <CheckCircle2 size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
