"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryNav from "@/components/layout/CategoryNav";
import PageGrid from "@/components/layout/PageGrid";
import SeriesNav from "@/components/home/SeriesNav";
import AboutTowel from "@/components/home/AboutTowel";
import FogBackground, {
  type FogBackgroundHandle,
} from "@/components/home/FogBackground";
import WipeDraggable from "@/components/home/WipeDraggable";
import { categories } from "@/data/site";
import { tokenToPx } from "@/lib/cssLength";

/**
 * 메인 페이지 무대
 * Figma 프레임 1728 × 1117
 * - 첫 화면: 서브 카테고리 없음
 * - 카테고리 호버 시 서브 카테고리 표시
 */
export default function MainStage() {
  const fogRef = useRef<FogBackgroundHandle>(null);
  const [margins, setMargins] = useState({ x: 20, y: 30 });
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );

  const hoveredSubItems = useMemo(() => {
    const category = categories.find((item) => item.id === hoveredCategoryId);
    return category?.subItems ?? [];
  }, [hoveredCategoryId]);

  useEffect(() => {
    const read = () => {
      setMargins({
        x: tokenToPx("--spacing-page-x"),
        y: tokenToPx("--spacing-page-y"),
      });
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const handleWipe = useCallback((x: number, y: number, radius: number) => {
    fogRef.current?.wipeAt(x, y, radius);
  }, []);

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div
        className="relative w-full max-w-[var(--frame-width)] overflow-hidden bg-background"
        style={{ height: "min(var(--frame-height), 100svh)" }}
      >
        <FogBackground ref={fogRef} />

        <PageGrid className="pointer-events-none relative z-10 h-full min-h-0 grid-rows-[auto_1fr_auto]">
          {/* 카테고리 + 서브메뉴를 한 영역으로 묶어서 호버 유지 */}
          <div
            className="pointer-events-auto col-span-12 row-start-1 grid grid-cols-subgrid"
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <div className="col-span-2 col-start-1">
              <CategoryNav onHoverChange={setHoveredCategoryId} />
            </div>

            <div className="col-span-8 col-start-4">
              {hoveredSubItems.length > 0 ? (
                <SeriesNav items={hoveredSubItems} />
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
          <AboutTowel />
        </WipeDraggable>
      </div>
    </div>
  );
}
