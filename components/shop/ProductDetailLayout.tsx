"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, NavItem } from "@/lib/types";
import { categories } from "@/data/site";
import CategoryNav from "@/components/layout/CategoryNav";
import SeriesNav from "@/components/home/SeriesNav";
import ProductDetailInfo from "./ProductDetailInfo";

type ProductDetailLayoutProps = {
  product: Product;
  gallery: string[];
  categoryId: string;
  seriesItems: NavItem[];
};

/**
 * 상세 페이지
 * - 카테고리 호버: 카테고리만 → 특정 카테고리 호버 시 시리즈
 * - 이미지 박스 3칼럼부터, 설명 박스·갭 유지 / 시리즈 시 상단 150px
 */
export default function ProductDetailLayout({
  product,
  gallery,
  categoryId,
  seriesItems,
}: ProductDetailLayoutProps) {
  const category = categories.find((item) => item.id === categoryId);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );

  /** 특정 카테고리를 호버했을 때만 시리즈 표시 */
  const seriesToShow = useMemo(() => {
    if (!menuOpen || !hoveredCategoryId) return [];
    const hovered = categories.find((item) => item.id === hoveredCategoryId);
    return hovered?.subItems ?? [];
  }, [menuOpen, hoveredCategoryId]);

  const showSeries = seriesToShow.length > 0;
  const first = gallery[0];
  const rest = gallery.slice(1);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (el.scrollHeight <= el.clientHeight) return;
      el.scrollTop += event.deltaY;
      event.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="flex min-h-svh items-center justify-center bg-detail-bg">
      <div
        className="product-detail-frame relative w-full max-w-[var(--frame-width)] overflow-hidden"
        style={{ height: "min(var(--frame-height), 100svh)" }}
      >
        {/* 상단 카테고리 — 호버 영역 안에서만 메뉴 유지 */}
        <div
          className="absolute inset-x-0 top-0 z-30 px-[15px] pt-[23px]"
          onMouseLeave={() => {
            setMenuOpen(false);
            setHoveredCategoryId(null);
          }}
        >
          <div className="grid grid-cols-12 gap-gutter">
            <div
              className="col-span-2 col-start-1"
              onMouseEnter={() => {
                setMenuOpen(true);
                // 카테고리만 먼저 — 시리즈는 항목 호버 시
                setHoveredCategoryId(null);
              }}
            >
              {menuOpen ? (
                <CategoryNav
                  activeId={hoveredCategoryId ?? undefined}
                  onHoverChange={setHoveredCategoryId}
                  inverted
                />
              ) : category ? (
                <Link
                  href={category.href}
                  aria-label={category.label}
                  aria-current="page"
                  className="block"
                  onMouseEnter={() => {
                    setMenuOpen(true);
                    setHoveredCategoryId(null);
                  }}
                >
                  <Image
                    src={category.imageSrc}
                    alt={category.label}
                    width={category.imageWidth}
                    height={category.imageHeight}
                    className="h-[var(--size-category-h)] w-auto brightness-0 invert"
                    priority
                  />
                </Link>
              ) : null}
            </div>

            <div className="col-span-8 col-start-4 min-h-[48px]">
              {showSeries ? (
                <SeriesNav items={seriesToShow} light />
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={[
            "product-detail-grid relative z-10 h-full",
            menuOpen ? "is-menu-open" : "",
            showSeries ? "is-series-open" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* 이미지 7→밀림 시 3칼럼부터 / 스크롤 */}
          <div
            ref={galleryRef}
            className="product-detail-gallery min-h-0 overflow-y-auto overscroll-contain rounded-[4px] bg-background transition-none"
          >
            {first ? (
              <div className="bg-background">
                <Image
                  src={first}
                  alt={`${product.name} 1`}
                  width={1600}
                  height={2000}
                  sizes="40vw"
                  className="mx-auto h-auto w-[68%] object-contain"
                  priority
                />
              </div>
            ) : null}

            {first && rest.length > 0 ? (
              <div className="h-[10px] bg-background" aria-hidden="true" />
            ) : null}

            <div className="flex flex-col gap-0">
              {rest.map((src, index) => (
                <Image
                  key={`${src}-${index}`}
                  src={src}
                  alt={`${product.name} ${index + 2}`}
                  width={1600}
                  height={2000}
                  sizes="58vw"
                  className="h-auto w-full object-contain"
                />
              ))}
            </div>
          </div>

          {/* 정보 5칼럼 — 위치·갭 유지, 스크롤 고정 */}
          <div className="product-detail-panel min-h-0 overflow-hidden rounded-[4px] bg-background">
            <ProductDetailInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
