import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl px-4 py-2 transition"
>
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
