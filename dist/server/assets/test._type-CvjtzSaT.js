import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useCallback } from "react";
import { N as Navbar } from "./Navbar-AeEZ3lWq.js";
import { e as encryptResult } from "./encrypt-DSOFwvtM.js";
import { R as Route } from "./router-CSLBa8cF.js";
import "crypto-js";
import "@tanstack/react-query";
function Timer({ deadline, onExpire }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, Math.floor((deadline - now) / 1e3));
  useEffect(() => {
    if (remaining === 0) onExpire();
  }, [remaining, onExpire]);
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxs("div", { className: `timer ${remaining < 60 ? "warning" : ""}`, children: [
    m,
    ":",
    s
  ] });
}
function DragDrop({
  tokens,
  value,
  onChange
}) {
  const [dragIdx, setDragIdx] = useState(null);
  const [dragFrom, setDragFrom] = useState(null);
  const placed = value;
  tokens.filter(
    (t) => placed.filter((p) => p === t).length < tokens.filter((tt) => tt === t).length
  );
  const remaining = [];
  const counts = {};
  for (const t of tokens) counts[t] = (counts[t] || 0) + 1;
  for (const t of placed) counts[t]--;
  for (const t of tokens) {
    if (counts[t] > 0) {
      remaining.push(t);
      counts[t]--;
    }
  }
  const onDropZone = (e) => {
    e.preventDefault();
    if (dragIdx === null) return;
    if (dragFrom === "pool") {
      onChange([...placed, remaining[dragIdx]]);
    }
    setDragIdx(null);
    setDragFrom(null);
  };
  const removeFromDrop = (i) => {
    onChange(placed.filter((_, idx) => idx !== i));
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "drag-zone",
        onDragOver: (e) => e.preventDefault(),
        onDrop: onDropZone,
        children: [
          placed.length === 0 && /* @__PURE__ */ jsx("span", { style: { color: "var(--muted)", fontSize: 13 }, children: "Bu yerga sudrab tashlang" }),
          placed.map((tok, i) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "drag-token in-drop",
              onClick: () => removeFromDrop(i),
              title: "Olib tashlash",
              children: tok
            },
            i
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: remaining.map((tok, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "drag-token",
        draggable: true,
        onDragStart: () => {
          setDragIdx(i);
          setDragFrom("pool");
        },
        onClick: () => onChange([...placed, tok]),
        children: tok
      },
      i
    )) }),
    /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--muted)", marginTop: 8 }, children: "Tokenni bosib qo'shing yoki sudrang. Joylashgan tokenni bosish — olib tashlaydi." })
  ] });
}
function QuestionCard({
  q,
  index,
  total,
  answer,
  onAnswer,
  onHint
}) {
  return /* @__PURE__ */ jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxs("div", { className: "question-meta", children: [
      "Savol ",
      index + 1,
      " / ",
      total,
      " · ",
      q.topic,
      " · ",
      q.type === "code" ? "Kod yozish" : q.type === "fix" ? "Xatoni tuzating" : "Sudrab joylash"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "question-text", children: q.question }),
    q.type === "code" && /* @__PURE__ */ jsx(
      "textarea",
      {
        className: "code",
        placeholder: q.placeholder || "",
        value: answer?.value || "",
        onChange: (e) => onAnswer(e.target.value)
      }
    ),
    q.type === "fix" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "code-block", style: { marginBottom: 10 }, children: q.brokenCode }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "code",
          placeholder: "To'g'rilangan kodni yozing",
          value: answer?.value || "",
          onChange: (e) => onAnswer(e.target.value)
        }
      )
    ] }),
    q.type === "drag" && /* @__PURE__ */ jsx(
      DragDrop,
      {
        tokens: q.tokens,
        value: answer?.value || [],
        onChange: onAnswer
      }
    ),
    q.type === "mcq" && /* @__PURE__ */ jsx("div", { className: "options", children: q.options.map((opt, i) => /* @__PURE__ */ jsxs("label", { className: "option", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "radio",
          name: `q-${q.id}`,
          value: opt.charAt(0),
          checked: answer?.value === opt.charAt(0),
          onChange: (e) => onAnswer(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: opt } })
    ] }, i)) }),
    q.type === "truefalse" && /* @__PURE__ */ jsx("div", { className: "options", children: ["True", "False"].map((label, i) => {
      const value = label === "True" ? "true" : "false";
      return /* @__PURE__ */ jsxs("label", { className: "option", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            name: `q-${q.id}`,
            value,
            checked: answer?.value === value,
            onChange: (e) => onAnswer(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx("span", { children: label })
      ] }, i);
    }) }),
    /* @__PURE__ */ jsx("div", { style: { marginTop: 14 }, children: answer?.hintUsed ? /* @__PURE__ */ jsxs("div", { className: "hint-box", children: [
      "💡 ",
      q.hint
    ] }) : /* @__PURE__ */ jsx("button", { className: "btn-ghost btn", onClick: onHint, type: "button", children: "Maslahat olish (−3%)" }) })
  ] });
}
const htmlQuestions = [
  // ─── A/B/C/D VARIANTLAR (10 ta) ─────────────────────────────
  {
    id: 1,
    type: "mcq",
    topic: "HTML asoslari",
    question: "HTML qisqartmasi nimani anglatadi?",
    options: [
      "A) Hyper Text Markup Language",
      "B) High Tech Modern Language",
      "C) Hyper Transfer Markup Logic",
      "D) Home Tool Markup Language"
    ],
    answer: "A",
    hint: "HTML veb-sahifalar yaratish uchun ishlatiladigan belgilash tili.",
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
    question: "HTML — dasturlash tili hisoblanadi.",
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
    hint: "&lt;br&gt; — line break, matnni keyingi qatordan davom ettiradi.",
    points: 4
  },
  {
    id: 13,
    type: "truefalse",
    topic: "HTML tuzilishi",
    question: "&lt;!DOCTYPE html&gt; deklaratsiyasi &lt;html&gt; tegidan keyin yoziladi.",
    answer: false,
    hint: "&lt;!DOCTYPE html&gt; — HTML faylning eng birinchi qatorida bo'lishi shart.",
    points: 4
  },
  {
    id: 14,
    type: "truefalse",
    topic: "Atributlar",
    question: "&lt;a&gt; tegida target=&#39;_blank&#39; atributi havolani yangi tabda ochadi.",
    answer: true,
    hint: "_blank — yangi tab yoki oyna ochadi.",
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
    hint: "&lt;a href=&#39;manzil&#39;&gt;Matn&lt;/a&gt; — havola yaratishning asosiy shakli.",
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
      `<ul>
  <li>Olma</li>
  <li>Nok</li>
  <li>Banan</li>
</ul>`,
      `<ul>
<li>Olma</li>
<li>Nok</li>
<li>Banan</li>
</ul>`
    ],
    hint: "Tartibsiz ro'yxat: &lt;ul&gt; ichida &lt;li&gt; elementlar.",
    points: 4
  },
  {
    id: 20,
    type: "code",
    topic: "Formalar",
    question: "Ism kiritish uchun matn input yozing. placeholder='Ismingiz' bo'lsin.",
    placeholder: "<!-- Input tegini shu yerga yozing -->",
    accepted: [
      `<input type="text" placeholder="Ismingiz">`,
      `<input type="text" placeholder='Ismingiz'>`,
      `<input type="text" name="ism" placeholder="Ismingiz">`
    ],
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
    brokenCode: `<img src="rasm.jpg alt="Rasm">`,
    accepted: [
      `<img src="rasm.jpg" alt="Rasm">`,
      `<img src="rasm.jpg" alt="Rasm" />`
    ],
    hint: `Har bir atribut qiymati qo'shtirnoq ichida yopilishi kerak. &lt;img src="rasm.jpg" alt="Rasm"&gt;`,
    points: 4
  },
  {
    id: 25,
    type: "fix",
    topic: "Ro'yxat",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `<ul>
  <li>Olma
  <li>Nok</li>
</ul>`,
    accepted: [
      `<ul>
  <li>Olma</li>
  <li>Nok</li>
</ul>`
    ],
    hint: "Har bir &lt;li&gt; tegi &lt;/li&gt; bilan yopilishi shart.",
    points: 4
  }
];
const cssQuestions = [
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
      `.title {
  color: #2e7d32;
}`,
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
      `.box {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
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
      `.card {
  padding: 16px;
  margin: 8px;
}`,
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
      `.btn:hover {
  background-color: #1b5e20;
}`,
      `.btn:hover{background-color:#1b5e20;}`,
      `.btn:hover {
  background: #1b5e20;
}`
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
      `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}`,
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
    brokenCode: `.title {
  color: #2e7d32
  font-size: 24px;
}`,
    accepted: [
      `.title {
  color: #2e7d32;
  font-size: 24px;
}`
    ],
    hint: "Har bir CSS qoidasi nuqta-vergul (;) bilan tugatilishi shart.",
    points: 4
  },
  {
    id: 25,
    type: "fix",
    topic: "Flexbox",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `.nav {
  display: flexbox;
  gap: 12px;
}`,
    accepted: [
      `.nav {
  display: flex;
  gap: 12px;
}`
    ],
    hint: "To'g'ri qiymat 'flexbox' emas, 'flex' deb yoziladi.",
    points: 4
  }
];
const jsQuestions = [
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
      `A) 'Salom' yoki "Salom"`,
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
      `const ism = "Jasur";
console.log(ism);`,
      `const ism = 'Jasur';
console.log(ism);`,
      `const name = "Jasur";
console.log(name);`
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
      `function multiply(a, b) {
  return a * b;
}`,
      `const multiply = (a, b) => a * b;`,
      `const multiply = (a, b) => {
  return a * b;
};`
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
      `const el = document.getElementById('matn');
el.textContent = 'Yangi matn!';`
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
      `document.getElementById('tugma').addEventListener('click', () => {
  console.log('Bosildi!');
});`,
      `document.getElementById("tugma").addEventListener("click", function() {
  console.log("Bosildi!");
});`
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
    brokenCode: `function salom() {
  console.log("Salom!");
}
salom;`,
    accepted: [
      `function salom() {
  console.log("Salom!");
}
salom();`
    ],
    hint: "Funksiyani chaqirish uchun nomdan keyin () qo'shiladi: salom()",
    points: 4
  },
  {
    id: 25,
    type: "fix",
    topic: "O'zgaruvchi",
    question: "Quyidagi kodda xato bor. Toping va to'g'irlang:",
    brokenCode: `const yosh = 20;
yosh = 25;`,
    accepted: [
      `let yosh = 20;
yosh = 25;`
    ],
    hint: "const o'zgartirilmaydi. Qayta tayinlash uchun let ishlatiladi.",
    points: 4
  }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function norm(s) {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}
function isCorrect(q, value) {
  if (value === void 0) return false;
  if (q.type === "drag") {
    if (!Array.isArray(value)) return false;
    return value.length === q.correctOrder.length && value.every((v2, i) => v2 === q.correctOrder[i]);
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
  return (q.accepted || []).some((a) => norm(a) === v);
}
function scoreTest(questions, answers) {
  let total = 0;
  let earned = 0;
  const breakdown = [];
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
      studentAnswer: Array.isArray(ans?.value) ? ans.value.join(" ") : ans?.value ?? "",
      expected: q.type === "drag" ? q.correctOrder.join(" ") : q.accepted?.[0] ?? "",
      hintUsed: !!ans?.hintUsed
    });
  }
  const pct = total > 0 ? Math.round(earned / total * 100) : 0;
  return { earned: Math.round(earned * 100) / 100, total, pct, breakdown };
}
const DURATION_MS = 30 * 60 * 1e3;
const sources = {
  html: htmlQuestions,
  css: cssQuestions,
  js: jsQuestions
};
const titles = {
  html: "HTML test",
  css: "CSS test",
  js: "JavaScript test"
};
function TestPage() {
  const {
    type
  } = Route.useParams();
  const navigate = useNavigate();
  const valid = !!sources[type];
  const orderKey = `test_${type}_order`;
  const answersKey = `test_${type}_answers`;
  const deadlineKey = `test_${type}_deadline`;
  const questions = useMemo(() => {
    if (!valid || typeof window === "undefined") return [];
    const src = sources[type];
    try {
      const saved = localStorage.getItem(orderKey);
      if (saved) {
        const ids = JSON.parse(saved);
        const byId = new Map(src.map((q2) => [q2.id, q2]));
        const ordered = ids.map((i) => byId.get(i)).filter(Boolean);
        if (ordered.length === src.length) return ordered;
      }
    } catch {
    }
    const shuffled = shuffle(src);
    localStorage.setItem(orderKey, JSON.stringify(shuffled.map((q2) => q2.id)));
    return shuffled;
  }, [type, valid, orderKey]);
  const [deadline, setDeadline] = useState(() => {
    if (typeof window === "undefined") return Date.now() + DURATION_MS;
    const saved = localStorage.getItem(deadlineKey);
    if (saved) return parseInt(saved);
    const d = Date.now() + DURATION_MS;
    localStorage.setItem(deadlineKey, String(d));
    return d;
  });
  const [answers, setAnswers] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(answersKey) || "{}");
    } catch {
      return {};
    }
  });
  const [idx, setIdx] = useState(0);
  const [startedAt] = useState(() => deadline - DURATION_MS);
  useEffect(() => {
    localStorage.setItem(answersKey, JSON.stringify(answers));
  }, [answers, answersKey]);
  const setAnswer = (qid, v) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: {
        value: v,
        hintUsed: prev[qid]?.hintUsed || false
      }
    }));
  };
  const useHint = (qid) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: {
        value: prev[qid]?.value ?? "",
        hintUsed: true
      }
    }));
  };
  const submit = useCallback(() => {
    const result = scoreTest(questions, answers);
    const elapsed = Math.min(DURATION_MS, Date.now() - startedAt);
    const m = String(Math.floor(elapsed / 6e4)).padStart(2, "0");
    const s = String(Math.floor(elapsed % 6e4 / 1e3)).padStart(2, "0");
    const payload = {
      student: "anonymous",
      test: type,
      score: result.pct,
      earned: result.earned,
      total: result.total,
      timeTaken: `${m}:${s}`,
      breakdown: result.breakdown,
      timestamp: Date.now()
    };
    const encrypted = encryptResult(payload);
    localStorage.setItem(`result_${type}_encrypted`, encrypted);
    localStorage.removeItem(orderKey);
    localStorage.removeItem(answersKey);
    localStorage.removeItem(deadlineKey);
    navigate({
      to: "/result/$type",
      params: {
        type
      }
    });
  }, [questions, answers, startedAt, type, navigate, orderKey, answersKey, deadlineKey]);
  if (!valid) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("main", { className: "container", children: /* @__PURE__ */ jsx("h1", { children: "Test topilmadi" }) })
    ] });
  }
  const q = questions[idx];
  const answeredCount = Object.values(answers).filter((a) => {
    const v = a.value;
    return Array.isArray(v) ? v.length > 0 : !!v && v.trim() !== "";
  }).length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "decoration" }),
    /* @__PURE__ */ jsx(Navbar, { current: titles[type] }),
    /* @__PURE__ */ jsxs("main", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "test-header", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { style: {
            marginBottom: 4
          }, children: titles[type] }),
          /* @__PURE__ */ jsxs("div", { style: {
            color: "var(--muted)",
            fontSize: 13
          }, children: [
            "Javob berildi: ",
            answeredCount,
            " / ",
            questions.length
          ] })
        ] }),
        /* @__PURE__ */ jsx(Timer, { deadline, onExpire: submit })
      ] }),
      q && /* @__PURE__ */ jsx(QuestionCard, { q, index: idx, total: questions.length, answer: answers[q.id], onAnswer: (v) => setAnswer(q.id, v), onHint: () => useHint(q.id) }),
      /* @__PURE__ */ jsxs("div", { className: "nav-row", children: [
        /* @__PURE__ */ jsx("button", { className: "btn btn-ghost", disabled: idx === 0, onClick: () => setIdx(idx - 1), children: "Oldingi" }),
        idx < questions.length - 1 ? /* @__PURE__ */ jsx("button", { className: "btn", onClick: () => setIdx(idx + 1), children: "Keyingi" }) : /* @__PURE__ */ jsx("button", { className: "btn", onClick: submit, children: "Topshirish" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "progress-dots", children: questions.map((qq, i) => {
        const a = answers[qq.id]?.value;
        const has = Array.isArray(a) ? a.length > 0 : !!a && a.trim() !== "";
        return /* @__PURE__ */ jsx("button", { className: `dot ${has ? "answered" : ""} ${i === idx ? "current" : ""}`, onClick: () => setIdx(i), children: i + 1 }, qq.id);
      }) }),
      /* @__PURE__ */ jsx("div", { style: {
        marginTop: 24,
        textAlign: "right"
      }, children: /* @__PURE__ */ jsx("button", { className: "btn", onClick: submit, children: "Topshirish" }) })
    ] })
  ] });
}
export {
  TestPage as component
};
