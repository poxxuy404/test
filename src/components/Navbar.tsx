import { Link } from "@tanstack/react-router";

export function Navbar({ current }: { current?: string }) {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src="logo.png" alt="Logo" width="50" height="50" />
      </Link>
      <nav className="nav-links">
      </nav>
    </header>
  );
}