"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/site";

type CategoryNavProps = {
  activeId?: string;
  /** 호버 중인 카테고리 id (서브메뉴 표시용) */
  onHoverChange?: (categoryId: string | null) => void;
  /** 파란 바탕 등에서 흰색으로 보이기 */
  inverted?: boolean;
};

/**
 * 왼쪽 상단 카테고리 메뉴 (질감 텍스트 이미지)
 * 기본: 전부 블랙 / 호버·선택 시 나머지 opacity 20%
 */
export default function CategoryNav({
  activeId,
  onHoverChange,
  inverted = false,
}: CategoryNavProps) {
  const dimOthers = Boolean(activeId);

  return (
    <nav aria-label="Categories">
      <ul className="flex flex-col items-start gap-[var(--spacing-category-gap)]">
        {categories.map((item) => {
          const isActive = item.id === activeId;
          const opacityClass =
            !dimOthers || isActive ? "opacity-100" : "opacity-20";

          return (
            <li
              key={item.id}
              onMouseEnter={() => onHoverChange?.(item.id)}
            >
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={`block transition-opacity duration-300 ${opacityClass}`}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.label}
                  width={item.imageWidth}
                  height={item.imageHeight}
                  className={`h-[var(--size-category-h)] w-auto transition-[filter] duration-300 ${
                    inverted ? "brightness-0 invert" : ""
                  }`}
                  priority={item.id === "towel"}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
