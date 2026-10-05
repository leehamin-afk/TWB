"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavItem } from "@/lib/types";

type SeriesNavProps = {
  items: NavItem[];
  /** 현재 페이지의 시리즈 slug (샵). 없으면 전부 블랙으로 시작 */
  activeSlug?: string;
  /** 호버 중인 시리즈 slug (메인 상품 미리보기용) */
  onHoverChange?: (seriesSlug: string | null) => void;
  /** 디테일 등 파란 바탕용 흰색 텍스트 */
  light?: boolean;
};

/**
 * 서브 상품 카테고리 목록
 * 기본: 전부 블랙 / 호버·선택 시 해당만 블랙, 나머지·콤마 opacity 20%
 */
export default function SeriesNav({
  items,
  activeSlug,
  onHoverChange,
  light = false,
}: SeriesNavProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  if (items.length === 0) return null;

  const highlightSlug = hoveredSlug ?? activeSlug ?? null;
  const dimOthers = Boolean(highlightSlug);
  const textClass = light ? "text-white" : "text-foreground";

  return (
    <nav
      aria-label="Sub categories"
      onMouseLeave={() => {
        setHoveredSlug(null);
        onHoverChange?.(null);
      }}
    >
      <p
        className={`text-series font-semibold leading-[var(--text-series--line-height)] ${textClass}`}
      >
        {items.map((item, index) => {
          const slug = item.href.split("/").pop() ?? "";
          const isActive = dimOthers && slug === highlightSlug;
          const opacityClass =
            !dimOthers || isActive ? "opacity-100" : "opacity-20";

          return (
            <span
              key={item.href}
              className={`transition-opacity duration-300 ${opacityClass}`}
              onMouseEnter={() => {
                setHoveredSlug(slug);
                onHoverChange?.(slug);
              }}
            >
              <Link
                href={item.href}
                className={textClass}
                aria-current={
                  activeSlug && slug === activeSlug ? "page" : undefined
                }
              >
                {item.label}
              </Link>
              {index < items.length - 1 ? ", " : ","}
            </span>
          );
        })}
      </p>
    </nav>
  );
}
