import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Timer } from "@/components/Timer";
import { QuestionCard } from "@/components/QuestionCard";
import { htmlQuestions } from "@/data/htmlQuestions";
import { cssQuestions } from "@/data/cssQuestions";
import { jsQuestions } from "@/data/jsQuestions";
import { shuffle } from "@/utils/shuffle";
import type { Question } from "@/data/types";
import { scoreTest, type AnswerState } from "@/utils/score";
import { encryptResult } from "@/utils/encrypt";

export const Route = createFileRoute("/test/$type")({
  component: TestPage,
});

const DURATION_MS = 30 * 60 * 1000;

const sources: Record<string, Question[]> = {
  html: htmlQuestions,
  css: cssQuestions,
  js: jsQuestions,
};
const titles: Record<string, string> = { html: "HTML test", css: "CSS test", js: "JavaScript test" };

function TestPage() {
  const { type } = Route.useParams();
  const navigate = useNavigate();
  const valid = !!sources[type];

  const orderKey = `test_${type}_order`;
  const answersKey = `test_${type}_answers`;
  const deadlineKey = `test_${type}_deadline`;

  const questions: Question[] = useMemo(() => {
    if (!valid) return [];
    const src = sources[type];
    if (!src) return [];
    if (typeof window === "undefined") return src;
    try {
      const saved = localStorage.getItem(orderKey);
      if (saved) {
        const ids: number[] = JSON.parse(saved);
        const byId = new Map(src.map((q) => [q.id, q]));
        const ordered = ids.map((i) => byId.get(i)).filter(Boolean) as Question[];
        if (ordered.length === src.length) return ordered;
      }
    } catch {}
    const shuffled = shuffle(src);
    localStorage.setItem(orderKey, JSON.stringify(shuffled.map((q) => q.id)));
    return shuffled;
  }, [type, valid, orderKey]);

  const [deadline, setDeadline] = useState<number>(() => {
    if (typeof window === "undefined") return Date.now() + DURATION_MS;
    const saved = localStorage.getItem(deadlineKey);
    if (saved) return parseInt(saved);
    const d = Date.now() + DURATION_MS;
    localStorage.setItem(deadlineKey, String(d));
    return d;
  });

  const [answers, setAnswers] = useState<Record<number, AnswerState>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(answersKey) || "{}");
    } catch {
      return {};
    }
  });

  const [idx, setIdx] = useState(0);
  const [startedAt] = useState<number>(() => deadline - DURATION_MS);

  useEffect(() => {
    localStorage.setItem(answersKey, JSON.stringify(answers));
  }, [answers, answersKey]);

  const setAnswer = (qid: number, v: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [qid]: { value: v, hintUsed: prev[qid]?.hintUsed || false } }));
  };

  const useHint = (qid: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: { value: prev[qid]?.value ?? "", hintUsed: true } }));
  };

  const submit = useCallback(() => {
    const result = scoreTest(questions, answers);
    const elapsed = Math.min(DURATION_MS, Date.now() - startedAt);
    const m = String(Math.floor(elapsed / 60000)).padStart(2, "0");
    const s = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
    const payload = {
      student: "anonymous",
      test: type,
      score: result.pct,
      earned: result.earned,
      total: result.total,
      timeTaken: `${m}:${s}`,
      breakdown: result.breakdown,
      timestamp: Date.now(),
    };
    const encrypted = encryptResult(payload);
    localStorage.setItem(`result_${type}_encrypted`, encrypted);
    localStorage.removeItem(orderKey);
    localStorage.removeItem(answersKey);
    localStorage.removeItem(deadlineKey);
    navigate({ to: "/result/$type", params: { type } });
  }, [questions, answers, startedAt, type, navigate, orderKey, answersKey, deadlineKey]);

  if (!valid) {
    return (
      <>
        <Navbar />
        <main className="container">
          <h1>Test topilmadi</h1>
        </main>
      </>
    );
  }

  const q = questions[idx];
  const answeredCount = Object.values(answers).filter((a) => {
    const v = a.value;
    return Array.isArray(v) ? v.length > 0 : !!v && v.trim() !== "";
  }).length;

  return (
    <>
      <div className="decoration" />
      <Navbar current={titles[type]} />
      <main className="container">
        <div className="test-header">
          <div>
            <h2 style={{ marginBottom: 4 }}>{titles[type]}</h2>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              Javob berildi: {answeredCount} / {questions.length}
            </div>
          </div>
          <Timer deadline={deadline} onExpire={submit} />
        </div>

        {q && (
          <QuestionCard
            q={q}
            index={idx}
            total={questions.length}
            answer={answers[q.id]}
            onAnswer={(v) => setAnswer(q.id, v)}
            onHint={() => useHint(q.id)}
          />
        )}

        <div className="nav-row">
          <button className="btn btn-ghost" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
            Oldingi
          </button>
          {idx < questions.length - 1 ? (
            <button className="btn" onClick={() => setIdx(idx + 1)}>Keyingi</button>
          ) : (
            <button className="btn" onClick={submit}>Topshirish</button>
          )}
        </div>

        <div className="progress-dots">
          {questions.map((qq, i) => {
            const a = answers[qq.id]?.value;
            const has = Array.isArray(a) ? a.length > 0 : !!a && (a as string).trim() !== "";
            return (
              <button
                key={qq.id}
                className={`dot ${has ? "answered" : ""} ${i === idx ? "current" : ""}`}
                onClick={() => setIdx(i)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 24, textAlign: "right" }}>
          <button className="btn" onClick={submit}>Topshirish</button>
        </div>
      </main>
    </>
  );
}
