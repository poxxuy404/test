import type { Question } from "@/data/types";

export const cssQuestions: Question[] = [
  {
    id: 1,
    type: "mcq",
    topic: "CSS asoslari",
    question: "CSS qisqartmasi nimani anglatadi?",
    options: [
      "A) Cascading Style Sheets",
      "B) Creative Style System",
      "C) Computer Style Sheets",
      "D) Colorful Style Syntax"
    ],
    answer: "A",
    hint: "CSS — veb-sahifalarni bezash uchun ishlatiladigan uslublar tili.",
    points: 4
  },

  {
    id: 2,
    type: "mcq",
    topic: "Selektorlar",
    question: "Klass selektori qaysi belgi bilan boshlanadi?",
    options: [
      "A) #",
      "B) *",
      "C) .",
      "D) @"
    ],
    answer: "C",
    hint: "Klass selektori nuqta (.) bilan, ID selektori # bilan boshlanadi.",
    points: 4
  },

  {
    id: 3,
    type: "mcq",
    topic: "Selektorlar",
    question: "ID selektori qaysi belgi bilan boshlanadi?",
    options: [
      "A) .",
      "B) @",
      "C) *",
      "D) #"
    ],
    answer: "D",
    hint: "ID selektori # bilan boshlanadi: #elementId { }",
    points: 4
  },

  {
    id: 4,
    type: "mcq",
    topic: "Box model",
    question: "Elementning ichki bo'shlig'i qaysi xususiyat bilan beriladi?",
    options: [
      "A) margin",
      "B) spacing",
      "C) padding",
      "D) border"
    ],
    answer: "C",
    hint: "padding — content va border orasidagi ichki bo'shliq.",
    points: 4
  },

  {
    id: 5,
    type: "mcq",
    topic: "Box model",
    question: "Elementning tashqi bo'shlig'i qaysi xususiyat bilan beriladi?",
    options: [
      "A) padding",
      "B) margin",
      "C) gap",
      "D) space"
    ],
    answer: "B",
    hint: "margin — elementlar orasidagi tashqi bo'shliq.",
    points: 4
  },

  {
    id: 6,
    type: "mcq",
    topic: "Flexbox",
    question: "Flexbox ni yoqish uchun qaysi xususiyat ishlatiladi?",
    options: [
      "A) display: block",
      "B) display: inline",
      "C) display: flex",
      "D) flex: true"
    ],
    answer: "C",
    hint: "display: flex — elementni flex konteynerga aylantiradi.",
    points: 4
  },

  {
    id: 7,
    type: "mcq",
    topic: "Flexbox",
    question: "Flex elementlarni gorizontal o'rtaga tekislash uchun qaysi xususiyat ishlatiladi?",
    options: [
      "A) align-items: center",
      "B) text-align: center",
      "C) justify-content: center",
      "D) flex-align: middle"
    ],
    answer: "C",
    hint: "justify-content — asosiy o'q (gorizontal) bo'ylab tekislaydi.",
    points: 4
  },

  {
    id: 8,
    type: "mcq",
    topic: "Ranglar",
    question: "CSS da oq rangni qaysi qiymat bilan berish mumkin?",
    options: [
      "A) color: white yoki #ffffff",
      "B) color: #000000",
      "C) color: blank",
      "D) color: light"
    ],
    answer: "A",
    hint: "Oq rang: white yoki #ffffff yoki rgb(255,255,255).",
    points: 4
  },

  {
    id: 9,
    type: "mcq",
    topic: "Border-radius",
    question: "Elementning burchaklarini yumaloq qilish uchun qaysi xususiyat ishlatiladi?",
    options: [
      "A) corner-radius",
      "B) round-border",
      "C) border-radius",
      "D) border-curve"
    ],
    answer: "C",
    hint: "border-radius: 8px — burchaklarni yumaloqlashtiradi.",
    points: 4
  },

  {
    id: 10,
    type: "mcq",
    topic: "Grid",
    question: "CSS Grid ni yoqish uchun qaysi xususiyat ishlatiladi?",
    options: [
      "A) display: table",
      "B) display: grid",
      "C) layout: grid",
      "D) grid: true"
    ],
    answer: "B",
    hint: "display: grid — elementni grid konteynerga aylantiradi.",
    points: 4
  },

  // ─── TRUE / FALSE (5 ta) ─────────────────────────────────────

  {
    id: 11,
    type: "truefalse",
    topic: "CSS asoslari",
    question: "CSS faylini HTML ga ulash uchun &lt;style&gt; tegi ishlatiladi.",
    answer: false,
    hint: "Tashqi CSS faylni ulash uchun &lt;link rel='stylesheet' href='style.css'&gt; ishlatiladi.",
    points: 4
  },

  {
    id: 12,
    type: "truefalse",
    topic: "Flexbox",
    question: "align-items: center — flex elementlarni vertikal o'rtaga tekislaydi.",
    answer: true,
    hint: "align-items — kross o'q (vertikal) bo'ylab tekislaydi.",
    points: 4
  },

  {
    id: 13,
    type: "truefalse",
    topic: "Box model",
    question: "margin: auto — elementni gorizontal o'rtaga tekislaydi.",
    answer: true,
    hint: "margin: auto — kenglik belgilangan blok elementni markazlaydi.",
    points: 4 
  },

  {
    id: 14,
    type: "truefalse",
    topic: "Selektorlar",
    question: "* selektori faqat div elementlarni tanlaydi.",
    answer: false,
    hint: "* — universal selektor, sahifadagi BARCHA elementlarni tanlaydi.",
    points: 4
  },

  {
    id: 15,
    type: "truefalse",
    topic: "Transition",
    question: "transition xususiyati CSS o'zgarishlarini silliq qiladi.",
    answer: true,
    hint: "transition: xususiyat vaqt — o'zgarish animatsiyali bo'ladi.",
    points: 4
  },

  // ─── KOD YOZISH (5 ta) ───────────────────────────────────────

  {
    id: 16,
    type: "code",
    topic: "Selektorlar",
    question: ".title klassidagi elementning rangini #2e7d32 qiling.",
    placeholder: "/* CSS kodini shu yerga yozing */",
    accepted: [
      `.title {\n  color: #2e7d32;\n}`,
      `.title{color:#2e7d32;}`
    ],
    hint: "Klass selektori: .klassNomi { xususiyat: qiymat; }",
    points: 4
  },

  {
    id: 17,
    type: "code",
    topic: "Flexbox",
    question: ".box elementini flex qiling va elementlarni o'rtaga tekislang (gorizontal va vertikal).",
    placeholder: "/* CSS kodini shu yerga yozing */",
    accepted: [
      `.box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
      `.box{display:flex;justify-content:center;align-items:center;}`
    ],
    hint: "justify-content — gorizontal, align-items — vertikal tekislash.",
    points: 4
  },

  {
    id: 18,
    type: "code",
    topic: "Box model",
    question: ".card elementiga ichki bo'shliq 16px va tashqi bo'shliq 8px bering.",
    placeholder: "/* CSS kodini shu yerga yozing */",
    accepted: [
      `.card {\n  padding: 16px;\n  margin: 8px;\n}`,
      `.card{padding:16px;margin:8px;}`
    ],
    hint: "padding — ichki, margin — tashqi bo'shliq.",
    points: 4
  },

  {
    id: 19,
    type: "code",
    topic: "Hover",
    question: ".btn tugmasi hover bo'lganda rangini #1b5e20 ga o'zgartiring.",
    placeholder: "/* CSS kodini shu yerga yozing */",
    accepted: [
      `.btn:hover {\n  background-color: #1b5e20;\n}`,
      `.btn:hover{background-color:#1b5e20;}`,
      `.btn:hover {\n  background: #1b5e20;\n}`
    ],
    hint: ":hover — sichqoncha ustiga kelganda ishlaydi.",
    points: 4
  },

  {
    id: 20,
    type: "code",
    topic: "Grid",
    question: ".grid elementini 3 ustunli grid ga aylantiring. Oraliq 24px bo'lsin.",
    placeholder: "/* CSS kodini shu yerga yozing */",
    accepted: [
      `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}`,
      `.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}`
    ],
    hint: "repeat(3, 1fr) — 3 ta teng kenglikdagi ustun.",
    points: 4
  },

  // ─── DRAG & DROP (3 ta) ──────────────────────────────────────

  {
    id: 21,
    type: "drag",
    topic: "Flexbox",
    question: "Tokenlarni to'g'ri tartibga qo'ying — flex markazlash kodini hosil qiling:",
    tokens: [`center;`, `display: flex;`, `justify-content:`, `.box {`, `}`],
    correctOrder: [`.box {`, `display: flex;`, `justify-content:`, `center;`, `}`],
    hint: "display: flex avval yoziladi, keyin justify-content.",
    points: 4
  },

  {
    id: 22,
    type: "drag",
    topic: "Grid",
    question: "Tokenlarni to'g'ri tartibga qo'ying — 3 ustunli grid hosil qiling:",
    tokens: [`1fr);`, `.grid {`, `grid-template-columns: repeat(3,`, `display: grid;`, `}`],
    correctOrder: [`.grid {`, `display: grid;`, `grid-template-columns: repeat(3,`, `1fr);`, `}`],
    hint: "display: grid avval, keyin grid-template-columns.",
    points: 4
  },

  {
    id: 23,
    type: "drag",
    topic: "Hover va Transition",
    question: "Tokenlarni to'g'ri tartibga qo'ying — hover effekti hosil qiling:",
    tokens: [`background: #1b5e20;`, `.btn:hover {`, `}`],
    correctOrder: [`.btn:hover {`, `background: #1b5e20;`, `}`],
    hint: ":hover pseudo-klass elementga sichqoncha tekkanda ishlaydi.",
    points: 4
  },

  // ─── FIX THE BUG (2 ta) ──────────────────────────────────────

  {
    id: 24,
    type: "fix",
    topic: "CSS sintaksis",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `.title {\n  color: #2e7d32\n  font-size: 24px;\n}`,
    accepted: [
      `.title {\n  color: #2e7d32;\n  font-size: 24px;\n}`
    ],
    hint: "Har bir CSS qoidasi nuqta-vergul (;) bilan tugatilishi shart.",
    points: 4
  },

  {
    id: 25,
    type: "fix",
    topic: "Flexbox",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `.nav {\n  display: flexbox;\n  gap: 12px;\n}`,
    accepted: [
      `.nav {\n  display: flex;\n  gap: 12px;\n}`
    ],
    hint: "To'g'ri qiymat 'flexbox' emas, 'flex' deb yoziladi.",
    points: 4
  }

];
