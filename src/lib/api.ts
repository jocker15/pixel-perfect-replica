const API_URL = import.meta.env.VITE_API_URL || "";

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = localStorage.getItem("auth_token");
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
}

async function streamRequest(
  endpoint: string,
  body: Record<string, unknown>,
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const err = new Error(`API error ${res.status}`);
    callbacks.onError?.(err);
    throw err;
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") {
          callbacks.onDone?.();
          return;
        }
        try {
          const parsed = JSON.parse(data);
          callbacks.onChunk(parsed.text ?? parsed.content ?? data);
        } catch {
          callbacks.onChunk(data);
        }
      }
    }
  }

  callbacks.onDone?.();
}

// --- Module endpoints ---

export function tarotReading(
  params: { spread_type: string; question?: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/tarot/reading", params, callbacks, signal);
}

export function dreamInterpret(
  params: { text: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/dream/interpret", params, callbacks, signal);
}

export function numerologyAnalyze(
  params: { name: string; birth_date: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/numerology/analyze", params, callbacks, signal);
}

export function astroForecast(
  params: { sign: string; topic: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/astro/forecast", params, callbacks, signal);
}

export function compatCheck(
  params: { date1: string; date2: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/compat/check", params, callbacks, signal);
}

export function runesReading(
  params: { spread_type: string; question?: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/runes/reading", params, callbacks, signal);
}

export function ichingReading(
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/iching/reading", {}, callbacks, signal);
}

export function coffeeReading(
  params: { type: string; question?: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/coffee/reading", params, callbacks, signal);
}

export function stonesReading(
  params: { type: string; need?: string },
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  return streamRequest("/api/stones/reading", params, callbacks, signal);
}

// --- Auth ---

export async function authTelegram(data: unknown) {
  return fetch(`${API_URL}/api/auth/telegram`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

export async function authLogin(email: string, password: string) {
  return fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json());
}

export async function authRegister(email: string, password: string) {
  return fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json());
}

// --- User data ---

export async function getUserProfile() {
  return fetch(`${API_URL}/api/user/profile`).then((r) => r.json());
}

export async function getHistory() {
  return fetch(`${API_URL}/api/history`).then((r) => r.json());
}
