import type { Question } from "@/data/types";

export const jsQuestions: Question[] = [
  // ─── A/B/C/D VARIANTLAR (10 ta) ─────────────────────────────

  {
    id: 1,
    type: "mcq",
    topic: "O'zgaruvchilar",
    question: "Qayta o'zgartirib bo'lmaydigan o'zgaruvchi qaysi kalit so'z bilan e'lon qilinadi?",
    options: [
      "A) var",
      "B) let",
      "C) const",
      "D) fixed"
    ],
    answer: "C",
    hint: "const — constant, ya'ni doimiy qiymat. Bir marta beriladi, o'zgartirilmaydi.",
    points: 4
  },

  {
    id: 2,
    type: "mcq",
    topic: "Ma'lumot turlari",
    question: "JavaScript da matn (string) qanday yoziladi?",
    options: [
      "A) 'Salom' yoki \"Salom\"",
      "B) [Salom]",
      "C) &lt;Salom&gt;",
      "D) {Salom}"
    ],
    answer: "A",
    hint: "String — bitta yoki ikkita qo'shtirnoq ichida yoziladi.",
    points: 4
  },

  {
    id: 3,
    type: "mcq",
    topic: "Funksiyalar",
    question: "Funksiyani e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
    options: [
      "A) def",
      "B) func",
      "C) method",
      "D) function"
    ],
    answer: "D",
    hint: "JavaScript da funksiya function kalit so'zi bilan e'lon qilinadi.",
    points: 4
  },

  {
    id: 4,
    type: "mcq",
    topic: "DOM",
    question: "id='sarlavha' elementini tanlash uchun qaysi kod to'g'ri?",
    options: [
      "A) document.getElement('sarlavha')",
      "B) document.getElementById('sarlavha')",
      "C) document.selectId('sarlavha')",
      "D) document.findId('sarlavha')"
    ],
    answer: "B",
    hint: "getElementById — id bo'yicha elementni topadi.",
    points: 4
  },

  {
    id: 5,
    type: "mcq",
    topic: "Massivlar",
    question: "Massivga yangi element qo'shish uchun qaysi metod ishlatiladi?",
    options: [
      "A) add()",
      "B) append()",
      "C) push()",
      "D) insert()"
    ],
    answer: "C",
    hint: "push() — massiv oxiriga yangi element qo'shadi.",
    points: 4
  },

  {
    id: 6,
    type: "mcq",
    topic: "Event",
    question: "Tugma bosilganda ishga tushadigan event qaysi?",
    options: [
      "A) onpress",
      "B) ontouch",
      "C) onclick yoki click",
      "D) onsubmit"
    ],
    answer: "C",
    hint: "click — eng ko'p ishlatiladigan event. addEventListener('click', ...) ko'rinishida.",
    points: 4
  },

  {
    id: 7,
    type: "mcq",
    topic: "localStorage",
    question: "localStorage ga ma'lumot saqlash uchun qaysi metod ishlatiladi?",
    options: [
      "A) localStorage.save()",
      "B) localStorage.set()",
      "C) localStorage.setItem()",
      "D) localStorage.store()"
    ],
    answer: "C",
    hint: "setItem(kalit, qiymat) — saqlash. getItem(kalit) — o'qish.",
    points: 4
  },

  {
    id: 8,
    type: "mcq",
    topic: "Shartlar",
    question: "if-else dan qisqaroq yozish uchun qaysi operator ishlatiladi?",
    options: [
      "A) switch",
      "B) ternary operator (?:)",
      "C) for loop",
      "D) try-catch"
    ],
    answer: "B",
    hint: "shart ? true_qiymat : false_qiymat — ternary operator.",
    points: 4
  },

  {
    id: 9,
    type: "mcq",
    topic: "JSON",
    question: "JavaScript ob'ektini JSON formatiga o'tkazish uchun qaysi metod ishlatiladi?",
    options: [
      "A) JSON.parse()",
      "B) JSON.convert()",
      "C) JSON.stringify()",
      "D) JSON.format()"
    ],
    answer: "C",
    hint: "stringify — ob'ektdan string. parse — stringdan ob'ekt.",
    points: 4
  },

  {
    id: 10,
    type: "mcq",
    topic: "Clipboard",
    question: "Matnni foydalanuvchi clipboard'iga yozish uchun qaysi API ishlatiladi?",
    options: [
      "A) document.clipboard.write()",
      "B) window.copy()",
      "C) navigator.clipboard.writeText()",
      "D) clipboard.setText()"
    ],
    answer: "C",
    hint: "navigator.clipboard.writeText(matn) — zamonaviy Clipboard API.",
    points: 4
  },

  // ─── TRUE / FALSE (5 ta) ─────────────────────────────────────

  {
    id: 11,
    type: "truefalse",
    topic: "O'zgaruvchilar",
    question: "let bilan e'lon qilingan o'zgaruvchini qayta o'zgartirish mumkin.",
    answer: true,
    hint: "let — qayta tayinlash mumkin. const esa tayinlanmaydi.",
    points: 4
  },

  {
    id: 12,
    type: "truefalse",
    topic: "Funksiyalar",
    question: "Funksiyani chaqirish uchun faqat nomini yozish kifoya: salom",
    answer: false,
    hint: "Funksiyani chaqirish uchun qavslar kerak: salom()",
    points: 4
  },

  {
    id: 13,
    type: "truefalse",
    topic: "Massivlar",
    question: "JavaScript massividagi birinchi element indeksi 1 dan boshlanadi.",
    answer: false,
    hint: "Massiv indeksi 0 dan boshlanadi: arr[0] — birinchi element.",
    points: 4
  },

  {
    id: 14,
    type: "truefalse",
    topic: "DOM",
    question: "textContent xususiyati elementning matnini o'zgartiradi.",
    answer: true,
    hint: "element.textContent = 'yangi matn' — elementdagi matnni almashtiradi.",
    points: 4
  },

  {
    id: 15,
    type: "truefalse",
    topic: "JSON",
    question: "JSON.parse() — stringni JavaScript ob'ektiga aylantiradi.",
    answer: true,
    hint: "parse — tahlil qilish. JSON stringni ob'ektga o'tkazadi.",
    points: 4
  },

  // ─── KOD YOZISH (5 ta) ───────────────────────────────────────

  {
    id: 16,
    type: "code",
    topic: "O'zgaruvchilar",
    question: "'Jasur' qiymatini saqlaydiganconst o'zgaruvchi e'lon qiling va konsolga chiqaring.",
    placeholder: "// Kodingizni shu yerga yozing",
    accepted: [
      `const ism = "Jasur";\nconsole.log(ism);`,
      `const ism = 'Jasur';\nconsole.log(ism);`,
      `const name = "Jasur";\nconsole.log(name);`
    ],
    hint: "const o'zgaruvchi = qiymat; — e'lon qilish. console.log() — konsolga chiqarish.",
    points: 4
  },

  {
    id: 17,
    type: "code",
    topic: "Funksiyalar",
    question: "Ikkita sonni ko'paytiruvchi multiply(a, b) funksiyasini yozing.",
    placeholder: "// Funksiyani shu yerga yozing",
    accepted: [
      `function multiply(a, b) {\n  return a * b;\n}`,
      `const multiply = (a, b) => a * b;`,
      `const multiply = (a, b) => {\n  return a * b;\n};`
    ],
    hint: "return — funksiyadan natijani qaytaradi.",
    points: 4
  },

  {
    id: 18,
    type: "code",
    topic: "DOM",
    question: "id='matn' elementining matnini 'Yangi matn!' ga o'zgartiring.",
    placeholder: "// Kodingizni shu yerga yozing",
    accepted: [
      `document.getElementById('matn').textContent = 'Yangi matn!';`,
      `document.getElementById("matn").textContent = "Yangi matn!";`,
      `const el = document.getElementById('matn');\nel.textContent = 'Yangi matn!';`
    ],
    hint: "getElementById — elementni topadi. textContent — matnni o'zgartiradi.",
    points: 4
  },

  {
    id: 19,
    type: "code",
    topic: "localStorage",
    question: "'til' kaliti bilan 'JavaScript' qiymatini localStorage ga saqlang.",
    placeholder: "// Kodingizni shu yerga yozing",
    accepted: [
      `localStorage.setItem('til', 'JavaScript');`,
      `localStorage.setItem("til", "JavaScript");`
    ],
    hint: "localStorage.setItem(kalit, qiymat) — saqlash uchun.",
    points: 4
  },

  {
    id: 20,
    type: "code",
    topic: "Event",
    question: "id='tugma' elementiga click eventi qo'shing. Bosilganda konsolga 'Bosildi!' chiqsin.",
    placeholder: "// Kodingizni shu yerga yozing",
    accepted: [
      `document.getElementById('tugma').addEventListener('click', () => {\n  console.log('Bosildi!');\n});`,
      `document.getElementById("tugma").addEventListener("click", function() {\n  console.log("Bosildi!");\n});`
    ],
    hint: "addEventListener('click', callback) — click eventini ulaydi.",
    points: 4
  },

  // ─── DRAG & DROP (3 ta) ──────────────────────────────────────

  {
    id: 21,
    type: "drag",
    topic: "O'zgaruvchi e'loni",
    question: "Tokenlarni to'g'ri tartibga qo'ying — o'zgaruvchi e'loni hosil qiling:",
    tokens: [`"Jasur";`, `const`, `=`, `ism`],
    correctOrder: [`const`, `ism`, `=`, `"Jasur";`],
    hint: "const o'zgaruvchiNomi = qiymat; — e'lon qilish tartibi.",
    points: 4
  },

  {
    id: 22,
    type: "drag",
    topic: "localStorage",
    question: "Tokenlarni to'g'ri tartibga qo'ying — localStorage saqlash kodini hosil qiling:",
    tokens: [`'qiymat');`, `.setItem(`, `'kalit',`, `localStorage`],
    correctOrder: [`localStorage`, `.setItem(`, `'kalit',`, `'qiymat');`],
    hint: "localStorage.setItem(kalit, qiymat) tartibi.",
    points: 4
  },

  {
    id: 23,
    type: "drag",
    topic: "Event listener",
    question: "Tokenlarni to'g'ri tartibga qo'ying — click event ulash kodini hosil qiling:",
    tokens: [`'click',`, `() => console.log('OK'));`, `.addEventListener(`, `document.getElementById('btn')`],
    correctOrder: [`document.getElementById('btn')`, `.addEventListener(`, `'click',`, `() => console.log('OK'));`],
    hint: "addEventListener(event, callback) — ikki argument oladi.",
    points: 4
  },

  // ─── FIX THE BUG (2 ta) ──────────────────────────────────────

  {
    id: 24,
    type: "fix",
    topic: "Funksiya chaqiruvi",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `function salom() {\n  console.log("Salom!");\n}\nsalom;`,
    accepted: [
      `function salom() {\n  console.log("Salom!");\n}\nsalom();`
    ],
    hint: "Funksiyani chaqirish uchun nomdan keyin () qo'shiladi: salom()",
    points: 4
  },

  {
    id: 25,
    type: "fix",
    topic: "O'zgaruvchi",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `const yosh = 20;\nyosh = 25;`,
    accepted: [
      `let yosh = 20;\nyosh = 25;`
    ],
    hint: "const o'zgartirilmaydi. Qayta tayinlash uchun let ishlatiladi.",
    points: 4
  }
];

// Jami: 25 savol | 100 ball
// 10 MCQ + 5 TrueFalse + 5 Code + 3 Drag + 2 Fix
// 70% oson, 30% o'rta