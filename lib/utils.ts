export const save = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(value));
};
export const load = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null; // 🚑 关键
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
};
export const clear = (key: string) => {
  localStorage.removeItem(key);
};
