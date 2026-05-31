import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { N as Navbar } from "./Navbar-AeEZ3lWq.js";
import { d as decryptResult } from "./encrypt-DSOFwvtM.js";
import { a as Route } from "./router-BvnyU3D4.js";
import "@tanstack/react-router";
import "crypto-js";
import "@tanstack/react-query";
function ResultPage() {
  const {
    type
  } = Route.useParams();
  const [encrypted, setEncrypted] = useState("");
  const [meta, setMeta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filename, setFilename] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    const e = localStorage.getItem(`result_${type}_encrypted`) || "";
    setEncrypted(e);
    if (e) {
      try {
        setMeta(decryptResult(e));
      } catch {
      }
    }
  }, [type]);
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
    const blob = new Blob([encrypted], {
      type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    closeModal();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") downloadFile();
    if (e.key === "Escape") closeModal();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "decoration" }),
    /* @__PURE__ */ jsx(Navbar, { current: "Natija" }),
    /* @__PURE__ */ jsxs("main", { className: "container", children: [
      /* @__PURE__ */ jsx("h1", { children: "Natijangizni o'qituvchingizga yuboring" }),
      meta ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          gap: 32,
          alignItems: "baseline",
          marginTop: 16
        }, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { style: {
            fontSize: 13,
            color: "var(--muted)"
          }, children: "Vaqt" }),
          /* @__PURE__ */ jsx("div", { style: {
            fontSize: 24,
            color: "var(--dark)",
            fontWeight: 600
          }, children: meta.timeTaken })
        ] }) }),
        /* @__PURE__ */ jsx("p", { style: {
          marginTop: 20
        }, children: "Pastdagi faylni o'qituvchingizga yuboring. Qaysi savollar to'g'ri/noto'g'ri ekanligi ko'rsatilmaydi. Uzur" }),
        /* @__PURE__ */ jsx("div", { style: {
          marginTop: 12,
          display: "flex",
          gap: 8
        }, children: /* @__PURE__ */ jsx("button", { className: "btn", onClick: openDownloadModal, children: "Fayl sifatida yuklash" }) })
      ] }) : /* @__PURE__ */ jsx("p", { children: "Natija topilmadi. Testni tugatganingizga ishonch hosil qiling." })
    ] }),
    showModal && /* @__PURE__ */ jsx("div", { style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3
    }, onClick: (e) => e.target === e.currentTarget && closeModal(), children: /* @__PURE__ */ jsxs("div", { style: {
      background: "white",
      borderRadius: 14,
      padding: "28px 32px",
      width: 360,
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)"
    }, children: [
      /* @__PURE__ */ jsx("h3", { style: {
        marginBottom: 16,
        fontSize: 16
      }, children: " Fayl nomini o'z ismingiz bilan belgilang" }),
      /* @__PURE__ */ jsx("input", { ref: inputRef, type: "text", value: filename, onChange: (e) => setFilename(e.target.value), onKeyDown: handleKeyDown, placeholder: "Iltimos o'z ismingizni kiriting", style: {
        width: "100%",
        border: "2px solid #e0e0e0",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 15,
        outline: "none",
        marginBottom: 16
      } }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: 10,
        justifyContent: "flex-end"
      }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn", onClick: closeModal, children: "Bekor qilish" }),
        /* @__PURE__ */ jsx("button", { className: "btn btn-primary", onClick: downloadFile, children: "Yuklash ⬇" })
      ] })
    ] }) })
  ] });
}
export {
  ResultPage as component
};
