import { API_BASE } from "@/lib/api";

const API_ROOT = API_BASE.replace(/\/api$/, "");

export function resolveMediaUrl(url?: string | null) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${API_ROOT}${url}`;
  return `${API_ROOT}/${url}`;
}
