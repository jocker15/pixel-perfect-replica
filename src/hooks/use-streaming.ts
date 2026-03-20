import { useState, useCallback, useRef } from "react";
import type { StreamCallbacks } from "@/lib/api";

export function useStreaming() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const start = useCallback(
    (apiFn: (callbacks: StreamCallbacks, signal?: AbortSignal) => Promise<void>) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setText("");
      setError(null);
      setLoading(true);

      apiFn(
        {
          onChunk: (chunk) => setText((prev) => prev + chunk),
          onDone: () => setLoading(false),
          onError: (err) => {
            setError(err.message);
            setLoading(false);
          },
        },
        controller.signal
      ).catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });
    },
    []
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    setText("");
    setError(null);
  }, []);

  return { text, loading, error, start, cancel, reset };
}
