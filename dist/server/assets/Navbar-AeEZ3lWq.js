import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function Navbar({ current }) {
  return /* @__PURE__ */ jsxs("header", { className: "navbar", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "logo", children: /* @__PURE__ */ jsx("img", { src: "logo.png", alt: "Logo", width: "50", height: "50" }) }),
    /* @__PURE__ */ jsx("nav", { className: "nav-links" })
  ] });
}
export {
  Navbar as N
};
