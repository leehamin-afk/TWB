"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { utilityNav } from "@/data/site";

/**
 * 오른쪽 아래 Login / Cart / Search
 * - 메인: Inter Semi Bold (--text-utility in globals.css)
 * - 서브: Inter Semi Bold (--text-utility-shop in globals.css)
 */
export default function UtilityNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      aria-label="Account"
      className="pointer-events-auto fixed bottom-page-y right-page-x z-40 text-right"
    >
      <ul
        className={`flex flex-col font-semibold text-foreground ${
          isHome ? "text-utility" : "text-utility-shop"
        }`}
      >
        {utilityNav.map((item) => (
          <li
            key={item.href}
            className={
              isHome
                ? "leading-[var(--text-utility--line-height)]"
                : "leading-[var(--text-utility-shop--line-height)]"
            }
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
