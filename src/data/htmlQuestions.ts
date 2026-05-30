import type { Question } from "@/data/types";

export const htmlQuestions: Question[] = [
  // ─── A/B/C/D VARIANTLAR (10 ta) ─────────────────────────────

  {
    id: 1,
    type: "mcq",
    topic: "HTML asoslari",
    question: "UTF-8 nima uchun kerak?",
    options: [
      "A) Unicode kodlash usuli",
      "B) HTML5 versiyasi",
      "C) Veb-brauzer nomi",
      "D) Home Tool Markup Language"
    ],
    answer: "A",
    hint: "UTF-8 — Unicode uchun kodlash usuli, turli xil tillar uchun.",
    points: 4
  },

  {
    id: 2,
    type: "mcq",
    topic: "HTML teglar",
    question: "Eng katta sarlavha tegi qaysi?",
    options: [
      "A) &lt;h6&gt;",
      "B) &lt;h3&gt;",
      "C) &lt;h1&gt;",
      "D) &lt;header&gt;"
    ],
    answer: "C",
    hint: "Sarlavha teglari h1 dan h6 gacha bo'ladi — h1 eng katta.",
    points: 4
  },

  {
    id: 3,
    type: "mcq",
    topic: "HTML teglar",
    question: "Paragraf (matn bo'limi) uchun qaysi teg ishlatiladi?",
    options: [
      "A) &lt;text&gt;",
      "B) &lt;p&gt;",
      "C) &lt;para&gt;",
      "D) &lt;div&gt;"
    ],
    answer: "B",
    hint: "<p> — paragraph degan ma'noni anglatadi.",
    points: 4
  },

  {
    id: 4,
    type: "mcq",
    topic: "Rasmlar",
    question: "Rasmni sahifaga qo'shish uchun qaysi teg ishlatiladi?",
    options: [
      "A) &lt;picture&gt;",
      "B) &lt;photo&gt;",
      "C) &lt;image&gt;",
      "D) &lt;img&gt;"
    ],
    answer: "D",
    hint: "<img> — self-closing teg, yopilmaydi.",
    points: 4
  },

  {
    id: 5,
    type: "mcq",
    topic: "Havolalar",
    question: "Havola (link) yaratish uchun qaysi teg ishlatiladi?",
    options: [
      "A) &lt;link&gt;",
      "B) &lt;a&gt;",
      "C) &lt;href&gt;",
      "D) &lt;url&gt;"
    ],
    answer: "B",
    hint: "<a> — anchor degan ma'noni anglatadi.",
    points: 4
  },

  {
    id: 6,
    type: "mcq",
    topic: "Ro'yxatlar",
    question: "Tartibsiz ro'yxat (bullet list) uchun qaysi teg ishlatiladi?",
    options: [
      "A) &lt;ol&gt;",
      "B) &lt;list&gt;",
      "C) &lt;ul&gt;",
      "D) &lt;li&gt;"
    ],
    answer: "C",
    hint: "ul — unordered list, ol — ordered list.",
    points: 4
  },

  {
    id: 7,
    type: "mcq",
    topic: "Formalar",
    question: "Foydalanuvchi ma'lumot kiritishi uchun qaysi teg ishlatiladi?",
    options: [
      "A) &lt;input&gt;",
      "B) &lt;field&gt;",
      "C) &lt;enter&gt;",
      "D) &lt;data&gt;"
    ],
    answer: "A",
    hint: "<input> turli xil type atributlari bilan ishlaydi.",
    points: 4
  },

  {
    id: 8,
    type: "mcq",
    topic: "Semantik teglar",
    question: "Sahifaning asosiy navigatsiya qismi uchun qaysi semantik teg ishlatiladi?",
    options: [
      "A) &lt;header&gt;",
      "B) &lt;menu&gt;",
      "C) &lt;nav&gt;",
      "D) &lt;section&gt;"
    ],
    answer: "C",
    hint: "<nav> — navigation degan ma'noni anglatadi.",
    points: 4
  },

  {
    id: 9,
    type: "mcq",
    topic: "Atributlar",
    question: "Rasmning muqobil matni (screen reader uchun) qaysi atribut orqali beriladi?",
    options: [
      "A) title",
      "B) src",
      "C) alt",
      "D) name"
    ],
    answer: "C",
    hint: "alt — alternative text. Rasm yuklanmasa ko'rsatiladi.",
    points: 4
  },

  {
    id: 10,
    type: "mcq",
    topic: "Formalar",
    question: "Parol kiritish uchun qaysi input turi ishlatiladi?",
    options: [
      "A) type=&#39;secret&#39;",
      "B) type=&#39;hidden&#39;",
      "C) type=&#39;password&#39;",
      "D) type=&#39;secure&#39;"
    ],
    answer: "C",
    hint: "type='password' — kiritilgan belgilar yashirin ko'rinadi.",
    points: 4
  },

  // ─── TRUE / FALSE (5 ta) ─────────────────────────────────────

  {
    id: 11,
    type: "truefalse",
    topic: "HTML asoslari",
    question: "HTML — dasturlash tili hisoblanadi. [false xato degani true to'g'ri degani]",
    answer: false,
    hint: "HTML — belgilash tili (markup language), dasturlash tili emas.",
    points: 4
  },

  {
    id: 12,
    type: "truefalse",
    topic: "HTML teglar",
    question: "&lt;br&gt; tegi yangi qator yaratadi.",
    answer: true,
    hint: "&lt;br&gt; — line break, matnni keyingi qatordan davom ettiradi. [false xato degani true to'g'ri degani]",
    points: 4
  },

  {
    id: 13,
    type: "truefalse",
    topic: "HTML tuzilishi",
    question: "&lt;!DOCTYPE html&gt; deklaratsiyasi &lt;html&gt; tegidan keyin yoziladi.",
    answer: false,
    hint: "&lt;!DOCTYPE html&gt; — HTML faylning eng birinchi qatorida bo'lishi shart. [false xato degani true to'g'ri degani]",
    points: 4
  },

  {
    id: 14,
    type: "truefalse",
    topic: "Atributlar",
    question: "&lt;a&gt; tegida target=&#39;_blank&#39; atributi havolani yangi tabda ochadi.",
    answer: true,
    hint: "_blank — yangi tab yoki oyna ochadi. [false xato degani true to'g'ri degani]",
    points: 4
  },

  {
    id: 15,
    type: "truefalse",
    topic: "Jadvallar",
    question: "HTML jadvalda &lt;td&gt; tegi sarlavha katakchasini bildiradi.",
    answer: false,
    hint: "Sarlavha uchun &lt;th&gt;, oddiy katak uchun &lt;td&gt; ishlatiladi.",
    points: 4
  },

  // ─── KOD YOZISH (5 ta) ───────────────────────────────────────

  {
    id: 16,
    type: "code",
    topic: "Havolalar",
    question: "'Google' deb yoziladigan, https://google.com ga boradigan havola yozing.",
    placeholder: "<!-- Havolani shu yerga yozing -->",
    accepted: [
      `<a href="https://google.com">Google</a>`,
      `<a href='https://google.com'>Google</a>`
    ],
    hint: "href=\"https://google.com\" — havola yaratishning asosiy shakli.",
    points: 4
  },

  {
    id: 17,
    type: "code",
    topic: "Rasmlar",
    question: "logo.png rasmini qo'shing. alt matni 'Logo' bo'lsin.",
    placeholder: "<!-- Rasm tegini shu yerga yozing -->",
    accepted: [
      `<img src="logo.png" alt="Logo">`,
      `<img src='logo.png' alt='Logo'>`,
      `<img src="logo.png" alt="Logo" />`
    ],
    hint: "&lt;img src=&#39;fayl&#39; alt=&#39;matn&#39;&gt; — rasm tegining asosiy shakli.",
    points: 4
  },

  {
    id: 18,
    type: "code",
    topic: "Sarlavhalar",
    question: "'Salom Dunyo!' deb yozilgan birinchi darajali sarlavha yozing.",
    placeholder: "<!-- Sarlavhani shu yerga yozing -->",
    accepted: [
      `<h1>Salom Dunyo!</h1>`
    ],
    hint: "Birinchi darajali sarlavha: &lt;h1&gt;matn&lt;/h1&gt;.",
    points: 4
  },

  {
    id: 19,
    type: "code",
    topic: "Ro'yxatlar",
    question: "Olma, Nok, Banan — tartibsiz (bullet) ro'yxat yozing.",
    placeholder: "<!-- Ro'yxatni shu yerga yozing -->",
    accepted: [
      `<ul>\n  <li>Olma</li>\n  <li>Nok</li>\n  <li>Banan</li>\n</ul>`,
      `<ul>\n<li>Olma</li>\n<li>Nok</li>\n<li>Banan</li>\n</ul>`
    ],
    hint: "Tartibsiz ro'yxat: &lt;ul&gt; ichida &lt;li&gt; elementlar.",
    points: 4
  },

  {
    id: 20,
    type: "mcq",
    topic: "Formalar",
    question: "Ism kiritish uchun matn input yozing. placeholder='Ismingiz' bo'lsin.",
    options: [
      `A) <input type="text" placeholder='Ismingiz'>`,
      `B) <input type="text" name="ism" placeholder="Ismingizmi">`,
      `C) <input type="text" placeholder='Ismingiz'>`,
      `D) <input type="text" name="ism" placeholder="Ismingiz">`,
    ],
    answer: "D",
    hint: "type='text' — oddiy matn kiritish uchun.",
    points: 4
  },

  // ─── DRAG & DROP (3 ta) ──────────────────────────────────────

  {
    id: 21,
    type: "drag",
    topic: "Havola tegi",
    question: "Tokenlarni to'g'ri tartibga qo'ying — to'liq havola hosil qiling:",
    tokens: [`</a>`, `<a`, `href="https://google.com"`, `>`, `Google`],
    correctOrder: [`<a`, `href="https://google.com"`, `>`, `Google`, `</a>`],
    hint: "&lt;a&gt; tegi: ochilish, atribut, &gt;, matn, yopilish.",
    points: 4
  },

  {
    id: 22,
    type: "drag",
    topic: "Jadval tuzilishi",
    question: "Jadval elementlarini to'g'ri tartibda joylashtiring:",
    tokens: [`</table>`, `<table>`, `</tr>`, `<td>Ma'lumot</td>`, `<tr>`],
    correctOrder: [`<table>`, `<tr>`, `<td>Ma'lumot</td>`, `</tr>`, `</table>`],
    hint: "Jadval tartibi: &lt;table&gt; → &lt;tr&gt; → &lt;td&gt;.",
    points: 4
  },

  {
    id: 23,
    type: "drag",
    topic: "HTML skelet",
    question: "HTML5 skeletini to'g'ri tartibda joylashtiring:",
    tokens: [`<body></body>`, `<!DOCTYPE html>`, `</html>`, `<html>`, `<head></head>`],
    correctOrder: [`<!DOCTYPE html>`, `<html>`, `<head></head>`, `<body></body>`, `</html>`],
    hint: "DOCTYPE birinchi, so'ng &lt;html&gt;, ichida &lt;head&gt; va &lt;body&gt;.",
    points: 4
  },

  // ─── FIX THE BUG (2 ta) ──────────────────────────────────────

  {
    id: 24,
    type: "fix",
    topic: "Rasm tegi",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `<img src="rasm.jpg" alt="Rasm>`,
    accepted: [
      `<img src="rasm.jpg" alt="Rasm">`,
      `<img src="rasm.jpg" alt="Rasm" />`
    ],
    hint: "Har bir atribut qiymati qo'shtirnoq ichida yopilishi kerak. &lt;img src=\"rasm.jpg\" alt=\"Rasm\"&gt;",
    points: 4
  },

  {
    id: 25,
    type: "fix",
    topic: "Ro'yxat",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `<ul>\n  <li>Olma\n  <li>Nok</li>\n</ul>`,
    accepted: [
      `<ul>\n  <li>Olma</li>\n  <li>Nok</li>\n</ul>`
    ],
    hint: "Har bir &lt;li&gt; tegi &lt;/li&gt; bilan yopilishi shart.",
    points: 4
  }

];

// Jami: 25 savol | 100 ball
// 10 MCQ + 5 TrueFalse + 5 Code + 3 Drag + 2 Fix
// 70% oson, 30% o'rta