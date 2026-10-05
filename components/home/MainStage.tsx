"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryNav from "@/components/layout/CategoryNav";
import PageGrid from "@/components/layout/PageGrid";
import SeriesNav from "@/components/home/SeriesNav";
import HomeSpot from "@/components/home/HomeSpot";
import FogBackground, {
  type FogBackgroundHandle,
} from "@/components/home/FogBackground";
import WipeDraggable from "@/components/home/WipeDraggable";
import { categories } from "@/data/site";
import { tokenToPx } from "@/lib/cssLength";
import type { Product } from "@/lib/types";

type MainStageProps = {
  products: Product[];
};

function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)] ?? null;
}

function poolFor(
  products: Product[],
  categoryId: string | null,
  seriesSlug: string | null,
): Product[] {
  if (!categoryId) return [];
  let pool = products.filter((p) => p.category === categoryId);
  if (!seriesSlug) return pool;

  const bySeries = pool.filter((p) => p.series === seriesSlug);
  if (bySeries.length > 0) return bySeries;
  return pool.filter((p) => !p.series || p.series === seriesSlug);
}

function preloadImages(items: Product[]) {
  for (const item of items.slice(0, 8)) {
    const img = new window.Image();
    img.src = item.image;
  }
}

/**
 * 메인 페이지 무대
 * Figma 프레임 1728 × 1117
 * - 카테고리/시리즈 호버 시 About 자리에 랜덤 상품
 */
export default function MainStage({ products }: MainStageProps) {
  const fogRef = useRef<FogBackgroundHandle>(null);
  const [margins, setMargins] = useState({ x: 20, y: 30 });
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const categoryRef = useRef<string | null>(null);

  const hoveredSubItems = useMemo(() => {
    const category = categories.find((item) => item.id === hoveredCategoryId);
    return category?.subItems ?? [];
  }, [hoveredCategoryId]);

  useEffect(() => {
    const read = () => {
      setMargins({
        x: tokenToPx("--spacing-page-x") || 20,
        y: tokenToPx("--spacing-page-y") || 30,
      });
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const handleWipe = useCallback((x: number, y: number, radius: number) => {
    fogRef.current?.wipeAt(x, y, radius);
  }, []);

  const showPreview = useCallback(
    (categoryId: string | null, seriesSlug: string | null) => {
      if (!categoryId) {
        setPreviewProduct(null);
        return;
      }
      const pool = poolFor(products, categoryId, seriesSlug);
      preloadImages(pool);
      setPreviewProduct(pickRandom(pool));
    },
    [products],
  );

  const handleCategoryHover = useCallback(
    (categoryId: string | null) => {
      categoryRef.current = categoryId;
      setHoveredCategoryId(categoryId);
      showPreview(categoryId, null);
    },
    [showPreview],
  );

  const handleSeriesHover = useCallback(
    (seriesSlug: string | null) => {
      showPreview(categoryRef.current, seriesSlug);
    },
    [showPreview],
  );

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div
        className="relative w-full max-w-[var(--frame-width)] overflow-hidden bg-background"
        style={{ height: "min(var(--frame-height), 100svh)" }}
      >
        <FogBackground ref={fogRef} />

        <PageGrid className="pointer-events-none relative z-10 h-full min-h-0 grid-rows-[auto_1fr_auto]">
          <div
            className="pointer-events-auto col-span-12 row-start-1 grid grid-cols-subgrid"
            onMouseLeave={() => handleCategoryHover(null)}
          >
            <div className="col-span-2 col-start-1">
              <CategoryNav
                activeId={hoveredCategoryId ?? undefined}
                onHoverChange={handleCategoryHover}
              />
            </div>

            <div className="col-span-8 col-start-4">
              {hoveredSubItems.length > 0 ? (
                <SeriesNav
                  items={hoveredSubItems}
                  onHoverChange={handleSeriesHover}
                />
              ) : null}
            </div>
          </div>

          <div className="col-span-5 col-start-1 row-start-3" />
        </PageGrid>

        <WipeDraggable
          ariaLabel="TWB 소개 수건 — 드래그하면 김서림이 지워집니다"
          initial={{ left: margins.x, bottom: margins.y }}
          wipeRadius={120}
          onWipe={handleWipe}
        >
          {({ isDragging }) => (
            <HomeSpot product={previewProduct} isDragging={isDragging} />
          )}
        </WipeDraggable>
      </div>
    </div>
  );
}
