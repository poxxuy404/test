import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevTest — Frontend amaliy testlar" },
      { name: "description", content: "HTML, CSS va JavaScript bo'yicha amaliy test platformasi." },
    ],
  }),
  component: Home,
});

const tests = [
  { id: "html", title: "HTML", desc: "Semantik teglar, formalar, atributlar va tuzilma." },
  { id: "css", title: "CSS", desc: "Selektorlar, flex/grid, box model, position va birliklar." },
  { id: "js", title: "JavaScript", desc: "DOM, hodisalar, massivlar, funksiyalar va localStorage." },
];

function Home() {
  return (
    <>
      <div className="decoration" />
      <Navbar />
      <main className="container">
        <h1 style={{ fontSize: 32 }}>Frontend amaliy testlar</h1>
        <p style={{ color: "var(--muted)", maxWidth: 560 }}>
          Variantlardan tanlamaysiz — haqiqiy kod yozasiz, xatolarni tuzatasiz, tokenlarni joylashtiriasiz.
          Har bir test 25 ta savol, 30 daqiqa.
        </p>
        <div className="grid-cards">
          {tests.map((t) => (
            <div key={t.id} className="card card-hover">
              <h2 style={{ fontSize: 22 }}>{t.title}</h2>
              <p style={{ minHeight: 60 }}>{t.desc}</p>
              <Link to="/test/$type" params={{ type: t.id }}>
                <button className="btn">Boshlash</button>
              </Link>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 40, fontSize: 12, color: "var(--muted)" }}>
          Natijangiz shifrlangan kod ko'rinishida beriladi — uni o'qituvchiga yuboring.
        </p>
      </main>
    </>
  );
}
