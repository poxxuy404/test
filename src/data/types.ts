export type QuestionType = "code" | "fix" | "drag" | "mcq" | "truefalse";

export interface Question {
  id: number;
  type: QuestionType;
  topic: string;
  question: string;
  placeholder?: string;
  brokenCode?: string;
  accepted?: string[];
  tokens?: string[];
  correctOrder?: string[];
  options?: string[];
  answer?: string | boolean;
  hint: string;
  points: number;
}
