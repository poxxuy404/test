import { useEffect, useState } from "react";

export function Timer({ deadline, onExpire }: { deadline: number; onExpire: () => void }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, Math.floor((deadline - now) / 1000));
  useEffect(() => {
    if (remaining === 0) onExpire();
  }, [remaining, onExpire]);
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  return <div className={`timer ${remaining < 60 ? "warning" : ""}`}>{m}:{s}</div>;
}
