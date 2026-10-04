"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/site";

type CategoryNavProps = {
  activeId?: string;
  /** 호버 중인 카테고리 id (서브메뉴 표시용) */
  onHoverChange?: (categoryId: string | null) => void;
};

/**
 * 왼쪽 상단 카테고리 메뉴 (질감 텍스트 이미지)
 * 호버 시 서브 카테고리를 보여 주도록 onHoverChange를 호출합니다.
 */
export default function CategoryNav({
  activeId,
  onHoverChange,
}: CategoryNavProps) {
  return (
    <nav aria-label="Categories">
      <ul className="flex flex-col items-start gap-[8px]">
        {categories.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li
              key={item.id}
              onMouseEnter={() => onHoverChange?.(item.id)}
            >
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={`block transition-opacity ${
                  isActive ? "opacity-100" : "opacity-[0.28] hover:opacity-100"
                }`}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.label}
                  width={item.imageWidth}
                  height={item.imageHeight}
                  className="h-[44px] w-auto"
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
