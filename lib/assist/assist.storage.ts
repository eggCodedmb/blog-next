"use client";

import { AssistItem } from "@/types/assist";

const ASSIST_STORAGE_KEY = "assist_items_v1";

export function getAssistItems(): AssistItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(ASSIST_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as AssistItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

export function saveAssistItems(items: AssistItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ASSIST_STORAGE_KEY, JSON.stringify(items));
}

export function addAssistItem(item: AssistItem) {
  const items = getAssistItems();
  const nextItems = [item, ...items];
  saveAssistItems(nextItems);
  return nextItems;
}

export function getAssistItemById(id: string) {
  const items = getAssistItems();
  return items.find((item) => item.id === id) || null;
}
