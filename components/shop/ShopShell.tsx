"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SeriesNav from "@/components/home/SeriesNav";
import CategoryNav from "@/components/layout/CategoryNav";
import { categories } from "@/data/site";
import type { NavItem } from "@/lib/types";

type ShopShellProps = {
  /** categories 의 id (예: towel) */
  categoryId: string;
  seriesItems: NavItem[];
  activeSeriesSlug?: string;
  children: ReactNode;
};

/**
 * 샵 서브페이지 공통 뼈대
 * - 상단 호버: 시리즈(Beach Towel 등) 표시 — 상품은 안 내려감
 * - 왼쪽 호버: 메인과 같은 카테고리 메뉴 + 상품이 옆으로 밀림
 */
export default function ShopShell({
  categoryId,
  seriesItems,
  activeSeriesSlug,
  children,
}: ShopShellProps) {
  const category = categories.find((item) => item.id === categoryId);
  const [topHover, setTopHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );

  const seriesToShow = useMemo(() => {
    if (menuOpen) {
      const hovered = categories.find((item) => item.id === hoveredCategoryId);
      if (hovered?.subItems?.length) return hovered.subItems;
      return seriesItems;
    }
    if (topHover) return seriesItems;
    return [];
  }, [menuOpen, topHover, hoveredCategoryId, seriesItems]);

  const seriesActiveSlug =
    menuOpen && hoveredCategoryId && hoveredCategoryId !== categoryId
      ? undefined
      : activeSeriesSlug;

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div
        className="relative w-full max-w-[var(--frame-width)] overflow-x-clip bg-background"
        style={{ height: "min(var(--frame-height), 100svh)" }}
      >
        {/* 상단 메뉴 영역 — absolute라 상품 높이에 영향 없음 */}
        <div
          className="absolute inset-x-0 top-0 z-30 px-page-x pt-[var(--spacing-page-top)]"
          onMouseLeave={() => {
            setTopHover(false);
            setMenuOpen(false);
            setHoveredCategoryId(null);
          }}
        >
          <div className="grid grid-cols-12 gap-gutter">
            {/* 왼쪽: 현재 카테고리 / 호버 시 전체 카테고리 */}
            <div
              className="col-span-2 col-start-1"
              onMouseEnter={() => {
                setTopHover(true);
                setMenuOpen(true);
              }}
            >
              {menuOpen ? (
                <CategoryNav
                  activeId={hoveredCategoryId ?? categoryId}
                  onHoverChange={setHoveredCategoryId}
                />
              ) : category ? (
                <Link
                  href={category.href}
                  aria-label={category.label}
                  aria-current="page"
                  className="block"
                >
                  <Image
                    src={category.imageSrc}
                    alt={category.label}
                    width={category.imageWidth}
                    height={category.imageHeight}
                    className="h-[var(--size-category-h)] w-auto"
                    priority
                  />
                </Link>
              ) : null}
            </div>

            {/* 상단: 시리즈 카테고리 (호버 시 표시) */}
            <div
              className="col-span-8 col-start-4 min-h-[48px]"
              onMouseEnter={() => setTopHover(true)}
            >
              {seriesToShow.length > 0 ? (
                <SeriesNav
                  items={seriesToShow}
                  activeSlug={seriesActiveSlug}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* 상품 — 세로 중앙 고정, 왼쪽 카테고리 열릴 때만 옆으로 밀림 */}
        <div
          className={`shop-products pointer-events-auto absolute inset-0 z-10 flex items-center ${
            menuOpen ? "is-shifted" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
