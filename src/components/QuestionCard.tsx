import type { Question } from "@/data/types";
import { DragDrop } from "./DragDrop";
import type { AnswerState } from "@/utils/score";

export function QuestionCard({
  q,
  index,
  total,
  answer,
  onAnswer,
  onHint,
}: {
  q: Question;
  index: number;
  total: number;
  answer: AnswerState | undefined;
  onAnswer: (v: string | string[]) => void;
  onHint: () => void;
}) {
  return (
    <div className="card">
      <div className="question-meta">
        Savol {index + 1} / {total} · {q.topic} · {q.type === "code" ? "Kod yozish" : q.type === "fix" ? "Xatoni tuzating" : "Sudrab joylash"}
      </div>
      <div className="question-text">{q.question}</div>

      {q.type === "code" && (
        <textarea
          className="code"
          placeholder={q.placeholder || ""}
          value={(answer?.value as string) || ""}
          onChange={(e) => onAnswer(e.target.value)}
        />
      )}

      {q.type === "fix" && (
        <>
          <div className="code-block" style={{ marginBottom: 10 }}>{q.brokenCode}</div>
          <textarea
            className="code"
            placeholder="To'g'rilangan kodni yozing"
            value={(answer?.value as string) || ""}
            onChange={(e) => onAnswer(e.target.value)}
          />
        </>
      )}

      {q.type === "drag" && (
        <DragDrop
          tokens={q.tokens!}
          value={(answer?.value as string[]) || []}
          onChange={onAnswer}
        />
      )}

      {q.type === "mcq" && (
        <div className="options">
          {q.options!.map((opt, i) => (
            <label key={i} className="option">
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt.charAt(0)}
                checked={(answer?.value as string) === opt.charAt(0)}
                onChange={(e) => onAnswer(e.target.value)}
              />
              <span dangerouslySetInnerHTML={{ __html: opt }} />
            </label>
          ))}
        </div>
      )}

      {q.type === "truefalse" && (
        <div className="options">
          {["True", "False"].map((label, i) => {
            const value = label === "True" ? "true" : "false";
            return (
              <label key={i} className="option">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={value}
                  checked={(answer?.value as string) === value}
                  onChange={(e) => onAnswer(e.target.value)}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        {answer?.hintUsed ? (
          <div className="hint-box">💡 {q.hint}</div>
        ) : (
          <button className="btn-ghost btn" onClick={onHint} type="button">
            Maslahat olish (−3%)
          </button>
        )}
      </div>
    </div>
  );
}
