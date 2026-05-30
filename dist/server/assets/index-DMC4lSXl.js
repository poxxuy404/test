import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar } from "./Navbar-AeEZ3lWq.js";
const tests = [{
  id: "html",
  title: "HTML",
  desc: "Semantik teglar, formalar, atributlar va tuzilma."
}, {
  id: "css",
  title: "CSS",
  desc: "Selektorlar, flex/grid, box model, position va birliklar."
}, {
  id: "js",
  title: "JavaScript",
  desc: "DOM, hodisalar, massivlar, funksiyalar va localStorage."
}];
function Home() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "decoration" }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "container", children: [
      /* @__PURE__ */ jsx("h1", { style: {
        fontSize: 32
      }, children: "Frontend amaliy testlar" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "var(--muted)",
        maxWidth: 560
      }, children: "Variantlardan tanlamaysiz — haqiqiy kod yozasiz, xatolarni tuzatasiz, tokenlarni joylashtiriasiz. Har bir test 25 ta savol, 30 daqiqa." }),
      /* @__PURE__ */ jsx("div", { className: "grid-cards", children: tests.map((t) => /* @__PURE__ */ jsxs("div", { className: "card card-hover", children: [
        /* @__PURE__ */ jsx("h2", { style: {
          fontSize: 22
        }, children: t.title }),
        /* @__PURE__ */ jsx("p", { style: {
          minHeight: 60
        }, children: t.desc }),
        /* @__PURE__ */ jsx(Link, { to: "/test/$type", params: {
          type: t.id
        }, children: /* @__PURE__ */ jsx("button", { className: "btn", children: "Boshlash" }) })
      ] }, t.id)) }),
      /* @__PURE__ */ jsx("p", { style: {
        marginTop: 40,
        fontSize: 12,
        color: "var(--muted)"
      }, children: "Natijangiz shifrlangan kod ko'rinishida beriladi — uni o'qituvchiga yuboring." })
    ] })
  ] });
}
export {
  Home as component
};
