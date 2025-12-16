export const API_BASE =
  (import.meta.env.VITE_API_BASE || "/api").replace(/\/$/, "") || "/api";

async function handleJson(res: Response) {
  if (!res.ok) {
    const message = (await res.text()) || res.statusText;
    throw new Error(message);
  }
  return res.json();
}

export async function apiGet(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
  });
  return handleJson(res);
}

export async function apiPost(path: string, body: BodyInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    body,
    credentials: "include",
  });
  return handleJson(res);
}

export async function apiDelete(path: string, body: BodyInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    body,
    credentials: "include",
  });
  return handleJson(res);
}
