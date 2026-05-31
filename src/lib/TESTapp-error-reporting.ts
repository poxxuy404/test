type TESTAppErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type TESTAppEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: TESTAppErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __TESTAppEvents?: TESTAppEvents;
  }
}

export function reportTESTAppError(
  error: unknown,
  context: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  window.__TESTAppEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
