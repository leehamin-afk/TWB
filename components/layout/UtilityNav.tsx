"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { utilityNav } from "@/data/site";

/**
 * 오른쪽 아래 Login / Cart / Search
 * - 메인: Inter Semi Bold 55px
 * - 서브: Inter Semi Bold (--text-utility-shop)
 */
export default function UtilityNav() {
  const pathname = usePathname();
  const isHome = !pathname || pathname === "/";

  return (
    <nav
      aria-label="Account"
      className="pointer-events-auto fixed bottom-page-y right-page-x z-40 text-right"
    >
      <ul
        className={`flex flex-col font-semibold text-foreground ${
          isHome
            ? "text-[55px] leading-[64px]"
            : "text-utility-shop leading-[var(--text-utility-shop--line-height)]"
        }`}
      >
        {utilityNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
