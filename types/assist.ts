export const ASSIST_TASK_OPTIONS = [
  "芝麻分助力",
  "元宝助力",
  "千问助力",
] as const;

export type AssistTaskName = (typeof ASSIST_TASK_OPTIONS)[number];

export type AssistContentType = "token" | "image";

export interface AssistItem {
  id: string;
  taskName: AssistTaskName;
  contentType: AssistContentType;
  content: string;
  createdAt: string;
}
