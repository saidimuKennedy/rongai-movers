import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/#about" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export default function NavLinks() {
  const router = useRouter();

  return (
    <>
      {links.map((link, i) => (
        <Link
          key={link.name}
          href={link.href}
          className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap group overflow-hidden ${
            router.asPath === link.href
              ? "text-[#E65C1C]"
              : "text-gray-700 hover:text-[#E65C1C]"
          }`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <span className="relative z-10">{link.name}</span>
        </Link>
      ))}
    </>
  );
}
