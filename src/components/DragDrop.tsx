import { useState } from "react";

export function DragDrop({
  tokens,
  value,
  onChange,
}: {
  tokens: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragFrom, setDragFrom] = useState<"pool" | "drop" | null>(null);

  const placed = value;
  const pool = tokens.filter(
    (t) => placed.filter((p) => p === t).length < tokens.filter((tt) => tt === t).length
  );
  // compute remaining pool accounting for duplicates
  const remaining: string[] = [];
  const counts: Record<string, number> = {};
  for (const t of tokens) counts[t] = (counts[t] || 0) + 1;
  for (const t of placed) counts[t]--;
  for (const t of tokens) {
    if (counts[t] > 0) {
      remaining.push(t);
      counts[t]--;
    }
  }

  const onDropZone = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIdx === null) return;
    if (dragFrom === "pool") {
      onChange([...placed, remaining[dragIdx]]);
    }
    setDragIdx(null);
    setDragFrom(null);
  };

  const removeFromDrop = (i: number) => {
    onChange(placed.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div
        className="drag-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropZone}
      >
        {placed.length === 0 && <span style={{ color: "var(--muted)", fontSize: 13 }}>Bu yerga sudrab tashlang</span>}
        {placed.map((tok, i) => (
          <span
            key={i}
            className="drag-token in-drop"
            onClick={() => removeFromDrop(i)}
            title="Olib tashlash"
          >
            {tok}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {remaining.map((tok, i) => (
          <span
            key={i}
            className="drag-token"
            draggable
            onDragStart={() => {
              setDragIdx(i);
              setDragFrom("pool");
            }}
            onClick={() => onChange([...placed, tok])}
          >
            {tok}
          </span>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
        Tokenni bosib qo'shing yoki sudrang. Joylashgan tokenni bosish — olib tashlaydi.
      </p>
    </div>
  );
}
