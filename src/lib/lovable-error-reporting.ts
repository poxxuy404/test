type TEST appErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type TEST appEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: TEST appErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __TEST appEvents?: TEST appEvents;
  }
}

export function reportTEST appError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__TEST appEvents?.captureException?.(
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
