"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 메인 제외 모든 페이지 — 왼쪽 하단 TWB
 * 하단·왼쪽 마진: page-y / page-x
 */
export default function BrandMark() {
  const pathname = usePathname();
  // 메인(/) 또는 pathname 준비 전 → 표시 안 함
  if (!pathname || pathname === "/") return null;

  const isDetail = pathname.includes("/product/");

  return (
    <Link
      href="/"
      className={`fixed bottom-page-y left-page-x z-50 text-[20px] font-semibold leading-none ${
        isDetail ? "text-white" : "text-foreground"
      }`}
      aria-label="TWB 홈"
    >
      TWB
    </Link>
  );
}
