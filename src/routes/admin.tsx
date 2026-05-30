import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { decryptResult } from "@/utils/encrypt";
import type { QuestionScore } from "@/utils/score";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

interface DecodedResult {
  student: string;
  test: string;
  score: number;
  earned: number;
  total: number;
  timeTaken: string;
  timestamp: number;
  breakdown: QuestionScore[];
}

const ADMIN_PASSWORD = ""; // ← shu yerga o'zgartiring

function LoginScreen({ onLogin }: { onLogin: () => void }) {
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

  return (
    <>
      <div className="decoration" />
      <Navbar current="Admin" />
      <main className="container">
        <div style={{
          maxWidth: 360,
          margin: "80px auto",
          background: "var(--card, #fff)",
          borderRadius: 16,
          padding: "36px 32px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
          animation: shake ? "shake 0.4s" : undefined,
        }}>
          <h2 style={{ marginBottom: 8 }}> Admin panel</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
            Kirish uchun parolni kiriting
          </p>
          <input
            type="password"
            placeholder="Parol..."
            value={pass}
            autoFocus
            onChange={(e) => { setPass(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && tryLogin()}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 8,
              border: error ? "2px solid #c62828" : "2px solid #e0e0e0",
              fontSize: 15,
              outline: "none",
              marginBottom: 8,
            }}
          />
          {error && (
            <p style={{ color: "#c62828", fontSize: 13, marginBottom: 8 }}>{error}</p>
          )}
          <button
            className="btn"
            onClick={tryLogin}
            style={{ width: "100%", marginTop: 8 }}
          >
            Kirish
          </button>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%       { transform: translateX(-10px); }
            40%       { transform: translateX(10px); }
            60%       { transform: translateX(-8px); }
            80%       { transform: translateX(8px); }
          }
        `}</style>
      </main>
    </>
  );
}

function AdminPanel() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_auth") === "1"
  );
  const [input, setInput] = useState("");
  const [data, setData] = useState<DecodedResult | null>(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setData(null);
    setInput("");
  };

  const openFile = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput((ev.target?.result as string).trim());
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
      setData(decryptResult<DecodedResult>(input));
    } catch {
      setError("Shifrni o'qib bo'lmadi. Kodni tekshiring.");
    }
  };

  const saveResult = () => {
    if (!data) return;
    const lines = [
      `Test:     ${data.test.toUpperCase()}`,
      `Ball:     ${data.score}% (${data.earned} / ${data.total})`,
      `Vaqt:     ${data.timeTaken}`,
      `Sana:     ${new Date(data.timestamp).toLocaleString()}`,
      "",
      "Javoblar tafsiloti:",
      "-".repeat(60),
      ...data.breakdown.map((b, i) => [
        `${i + 1}. ${b.correct ? "✓" : "✗"}  Ball: ${b.awarded}/${b.max}  Maslahat: ${b.hintUsed ? "Ha" : "Yo'q"}`,
        `   Talaba:   ${b.studentAnswer || "—"}`,
        `   Kutilgan: ${b.expected || "—"}`,
      ].join("\n")),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^.]+$/, "") || "natija"}_ochilgan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="decoration" />
      <Navbar current="Admin" />
      <main className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Admin panel</h1>
          <button className="btn" onClick={logout} style={{ fontSize: 13 }}>
             Chiqish
          </button>
        </div>
        <p>Shifrlangan faylni oching yoki kodni quyiga joylashtiring.</p>

        <input ref={fileInputRef} type="file" accept=".txt" style={{ display: "none" }} onChange={onFileChange} />

        <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn" onClick={openFile}> .txt fayl ochish</button>
          {fileName && <span style={{ fontSize: 13, color: "var(--muted)" }}> {fileName}</span>}
        </div>

        <textarea
          className="code"
          placeholder="yoki shifrlangan kodni bu yerga joylashtiring..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ minHeight: 120, marginTop: 12 }}
        />

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="btn" onClick={decode}>🔓 Ochish</button>
          {data && <button className="btn" onClick={saveResult}>💾 Natijani saqlash</button>}
        </div>

        {error && <p style={{ color: "#c62828", marginTop: 12 }}>{error}</p>}

        {data && (
          <div style={{ marginTop: 24 }}>
            <table className="admin">
              <tbody>
                <tr><th>Test</th><td>{data.test.toUpperCase()}</td></tr>
                <tr><th>Ball</th><td>{data.score}% ({data.earned} / {data.total})</td></tr>
                <tr><th>Vaqt</th><td>{data.timeTaken}</td></tr>
                <tr><th>Sana</th><td>{new Date(data.timestamp).toLocaleString()}</td></tr>
              </tbody>
            </table>

            <h3 style={{ marginTop: 24 }}>Javoblar tafsiloti</h3>
            <table className="admin">
              <thead>
                <tr>
                  <th>#</th><th>Talaba javobi</th><th>Kutilgan</th><th>Ball</th><th>Maslahat</th>
                </tr>
              </thead>
              <tbody>
                {data.breakdown.map((b, i) => (
                  <tr key={i} className={b.correct ? "correct" : "wrong"}>
                    <td>{i + 1}</td>
                    <td><code>{b.studentAnswer || "—"}</code></td>
                    <td><code>{b.expected}</code></td>
                    <td>{b.awarded} / {b.max}</td>
                    <td>{b.hintUsed ? "Ha" : "Yo'q"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}