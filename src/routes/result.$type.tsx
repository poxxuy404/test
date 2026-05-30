import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { decryptResult } from "@/utils/encrypt";

export const Route = createFileRoute("/result/$type")({
  component: ResultPage,
});

interface ResultPayload {
  score: number;
  timeTaken: string;
  test: string;
}

function ResultPage() {
  const { type } = Route.useParams();
  const [encrypted, setEncrypted] = useState("");
  const [meta, setMeta] = useState<ResultPayload | null>(null);

  // Modal holati
  const [showModal, setShowModal] = useState(false);
  const [filename, setFilename] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const e = localStorage.getItem(`result_${type}_encrypted`) || "";
    setEncrypted(e);
    if (e) {
      try {
        setMeta(decryptResult<ResultPayload>(e));
      } catch { }
    }
  }, [type]);

  // Modal ochilganda inputga focus
  useEffect(() => {
    if (showModal) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [showModal]);

  const openDownloadModal = () => {
    setFilename("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFilename("");
  };

  const downloadFile = () => {
    const name = filename.trim() || "natija";
    const blob = new Blob([encrypted], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") downloadFile();
    if (e.key === "Escape") closeModal();
  };

  return (
    <>
      <div className="decoration" />
      <Navbar current="Natija" />
      <main className="container">
        <h1>Natijangizni o'qituvchingizga yuboring</h1>

        {meta ? (
          <>
            <div style={{ display: "flex", gap: 32, alignItems: "baseline", marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Vaqt</div>
                <div style={{ fontSize: 24, color: "var(--dark)", fontWeight: 600 }}>
                  {meta.timeTaken}
                </div>
              </div>
            </div>

            <p style={{ marginTop: 20 }}>
              Pastdagi faylni o'qituvchingizga yuboring. Qaysi savollar
              to'g'ri/noto'g'ri ekanligi ko'rsatilmaydi. Uzur
            </p>



            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>

              <button className="btn" onClick={openDownloadModal}>
                Fayl sifatida yuklash
              </button>
            </div>
          </>
        ) : (
          <p>Natija topilmadi. Testni tugatganingizga ishonch hosil qiling.</p>
        )}
      </main>

      {/* Fayl nomi modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: "28px 32px",
              width: 360,
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            }}
          >
            <h3 style={{ marginBottom: 16, fontSize: 16 }}> Fayl nomini o'z ismingiz bilan belgilang</h3>
            <input
              ref={inputRef}
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Iltimos o'z ismingizni kiriting"
              style={{
                width: "100%",
                border: "2px solid #e0e0e0",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 15,
                outline: "none",
                marginBottom: 16,
              }}
            />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn" onClick={closeModal}>
                Bekor qilish
              </button>
              <button className="btn btn-primary" onClick={downloadFile}>
                Yuklash ⬇
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}