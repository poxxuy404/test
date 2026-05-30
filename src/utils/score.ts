import type { Question } from "@/data/types";

export interface AnswerState {
  value: string | string[];
  hintUsed: boolean;
}

function norm(s: string) {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

export function isCorrect(q: Question, value: string | string[] | undefined): boolean {
  if (value === undefined) return false;
  if (q.type === "drag") {
    if (!Array.isArray(value)) return false;
    return value.length === q.correctOrder!.length &&
      value.every((v, i) => v === q.correctOrder![i]);
  }
  if (q.type === "mcq") {
    return String(value).trim().toUpperCase() === q.answer;
  }
  if (q.type === "truefalse") {
    const correctAnswer = q.answer === true ? "true" : "false";
    return String(value).trim().toLowerCase() === correctAnswer;
  }
  const v = norm(String(value));
  if (!v) return false;
  return (q.accepted || []).some(a => norm(a) === v);
}

export interface QuestionScore {
  id: number;
  correct: boolean;
  awarded: number;
  max: number;
  studentAnswer: string;
  expected: string;
  hintUsed: boolean;
}

export function scoreTest(questions: Question[], answers: Record<number, AnswerState>) {
  let total = 0;
  let earned = 0;
  const breakdown: QuestionScore[] = [];
  for (const q of questions) {
    const max = q.points;
    total += max;
    const ans = answers[q.id];
    const correct = isCorrect(q, ans?.value);
    let awarded = correct ? max : 0;
    if (correct && ans?.hintUsed) awarded = awarded * 0.97;
    earned += awarded;
    breakdown.push({
      id: q.id,
      correct,
      awarded: Math.round(awarded * 100) / 100,
      max,
      studentAnswer: Array.isArray(ans?.value) ? (ans!.value as string[]).join(" ") : (ans?.value as string) ?? "",
      expected: q.type === "drag" ? q.correctOrder!.join(" ") : (q.accepted?.[0] ?? ""),
      hintUsed: !!ans?.hintUsed,
    });
  }
  const pct = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { earned: Math.round(earned * 100) / 100, total, pct, breakdown };
}
