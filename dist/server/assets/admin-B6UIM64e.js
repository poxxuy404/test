import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { N as Navbar } from "./Navbar-AeEZ3lWq.js";
import { d as decryptResult } from "./encrypt-DSOFwvtM.js";
import "@tanstack/react-router";
import "crypto-js";
const ADMIN_PASSWORD = "";
function LoginScreen({
  onLogin
}) {
  const [pass, setPass] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");
  const tryLogin = () => {
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onLogin();
    } else {
      setError("Parol noto'g'ri!");
      setShake(true);
      setPass("");
      setTimeout(() => setShake(false), 500);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "decoration" }),
    /* @__PURE__ */ jsx(Navbar, { current: "Admin" }),
    /* @__PURE__ */ jsxs("main", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: {
        maxWidth: 360,
        margin: "80px auto",
        background: "var(--card, #fff)",
        borderRadius: 16,
        padding: "36px 32px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        animation: shake ? "shake 0.4s" : void 0
      }, children: [
        /* @__PURE__ */ jsx("h2", { style: {
          marginBottom: 8
        }, children: " Admin panel" }),
        /* @__PURE__ */ jsx("p", { style: {
          fontSize: 13,
          color: "var(--muted)",
          marginBottom: 24
        }, children: "Kirish uchun parolni kiriting" }),
        /* @__PURE__ */ jsx("input", { type: "password", placeholder: "Parol...", value: pass, autoFocus: true, onChange: (e) => {
          setPass(e.target.value);
          setError("");
        }, onKeyDown: (e) => e.key === "Enter" && tryLogin(), style: {
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: error ? "2px solid #c62828" : "2px solid #e0e0e0",
          fontSize: 15,
          outline: "none",
          marginBottom: 8
        } }),
        error && /* @__PURE__ */ jsx("p", { style: {
          color: "#c62828",
          fontSize: 13,
          marginBottom: 8
        }, children: error }),
        /* @__PURE__ */ jsx("button", { className: "btn", onClick: tryLogin, style: {
          width: "100%",
          marginTop: 8
        }, children: "Kirish" })
      ] }),
      /* @__PURE__ */ jsx("style", { children: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%       { transform: translateX(-10px); }
            40%       { transform: translateX(10px); }
            60%       { transform: translateX(-8px); }
            80%       { transform: translateX(8px); }
          }
        ` })
    ] })
  ] });
}
function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  if (!authed) {
    return /* @__PURE__ */ jsx(LoginScreen, { onLogin: () => setAuthed(true) });
  }
  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setData(null);
    setInput("");
  };
  const openFile = () => fileInputRef.current?.click();
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput((ev.target?.result).trim());
      setData(null);
      setError("");
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  const decode = () => {
    setError("");
    setData(null);
    try {
      setData(decryptResult(input));
    } catch {
      setError("Shifrni o'qib bo'lmadi. Kodni tekshiring.");
    }
  };
  const saveResult = () => {
    if (!data) return;
    const lines = [`Test:     ${data.test.toUpperCase()}`, `Ball:     ${data.score}% (${data.earned} / ${data.total})`, `Vaqt:     ${data.timeTaken}`, `Sana:     ${new Date(data.timestamp).toLocaleString()}`, "", "Javoblar tafsiloti:", "-".repeat(60), ...data.breakdown.map((b, i) => [`${i + 1}. ${b.correct ? "✓" : "✗"}  Ball: ${b.awarded}/${b.max}  Maslahat: ${b.hintUsed ? "Ha" : "Yo'q"}`, `   Talaba:   ${b.studentAnswer || "—"}`, `   Kutilgan: ${b.expected || "—"}`].join("\n"))];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^.]+$/, "") || "natija"}_ochilgan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "decoration" }),
    /* @__PURE__ */ jsx(Navbar, { current: "Admin" }),
    /* @__PURE__ */ jsxs("main", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsx("h1", { children: "Admin panel" }),
        /* @__PURE__ */ jsx("button", { className: "btn", onClick: logout, style: {
          fontSize: 13
        }, children: "Chiqish" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Shifrlangan faylni oching yoki kodni quyiga joylashtiring." }),
      /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", accept: ".txt", style: {
        display: "none"
      }, onChange: onFileChange }),
      /* @__PURE__ */ jsxs("div", { style: {
        marginTop: 12,
        display: "flex",
        gap: 8,
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn", onClick: openFile, children: " .txt fayl ochish" }),
        fileName && /* @__PURE__ */ jsxs("span", { style: {
          fontSize: 13,
          color: "var(--muted)"
        }, children: [
          " ",
          fileName
        ] })
      ] }),
      /* @__PURE__ */ jsx("textarea", { className: "code", placeholder: "yoki shifrlangan kodni bu yerga joylashtiring...", value: input, onChange: (e) => setInput(e.target.value), style: {
        minHeight: 120,
        marginTop: 12
      } }),
      /* @__PURE__ */ jsxs("div", { style: {
        marginTop: 12,
        display: "flex",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn", onClick: decode, children: "🔓 Ochish" }),
        data && /* @__PURE__ */ jsx("button", { className: "btn", onClick: saveResult, children: "💾 Natijani saqlash" })
      ] }),
      error && /* @__PURE__ */ jsx("p", { style: {
        color: "#c62828",
        marginTop: 12
      }, children: error }),
      data && /* @__PURE__ */ jsxs("div", { style: {
        marginTop: 24
      }, children: [
        /* @__PURE__ */ jsx("table", { className: "admin", children: /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Test" }),
            /* @__PURE__ */ jsx("td", { children: data.test.toUpperCase() })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Ball" }),
            /* @__PURE__ */ jsxs("td", { children: [
              data.score,
              "% (",
              data.earned,
              " / ",
              data.total,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Vaqt" }),
            /* @__PURE__ */ jsx("td", { children: data.timeTaken })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Sana" }),
            /* @__PURE__ */ jsx("td", { children: new Date(data.timestamp).toLocaleString() })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("h3", { style: {
          marginTop: 24
        }, children: "Javoblar tafsiloti" }),
        /* @__PURE__ */ jsxs("table", { className: "admin", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "#" }),
            /* @__PURE__ */ jsx("th", { children: "Talaba javobi" }),
            /* @__PURE__ */ jsx("th", { children: "Kutilgan" }),
            /* @__PURE__ */ jsx("th", { children: "Ball" }),
            /* @__PURE__ */ jsx("th", { children: "Maslahat" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: data.breakdown.map((b, i) => /* @__PURE__ */ jsxs("tr", { className: b.correct ? "correct" : "wrong", children: [
            /* @__PURE__ */ jsx("td", { children: i + 1 }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("code", { children: b.studentAnswer || "—" }) }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("code", { children: b.expected }) }),
            /* @__PURE__ */ jsxs("td", { children: [
              b.awarded,
              " / ",
              b.max
            ] }),
            /* @__PURE__ */ jsx("td", { children: b.hintUsed ? "Ha" : "Yo'q" })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminPanel as component
};
