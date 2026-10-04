import Link from "next/link";
import type { NavItem } from "@/lib/types";

type SeriesNavProps = {
  items: NavItem[];
  /** 현재 선택된 시리즈 slug (예: beach-towel). 없으면 모두 동일 강조 */
  activeSlug?: string;
};

/**
 * 서브 상품 카테고리 목록
 * Figma: Inter Semi Bold 44px / 60px
 * 샵에서 activeSlug가 있으면 활성만 검정, 나머지는 muted
 */
export default function SeriesNav({ items, activeSlug }: SeriesNavProps) {
  if (items.length === 0) return null;

  const hasActive = Boolean(activeSlug);

  return (
    <nav aria-label="Sub categories">
      <p className="text-series font-semibold leading-[var(--text-series--line-height)]">
        {items.map((item, index) => {
          const slug = item.href.split("/").pop() ?? "";
          const isActive = hasActive && slug === activeSlug;

          return (
            <span key={item.href}>
              <Link
                href={item.href}
                className={
                  !hasActive || isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }
                aria-current={isActive ? "page" : undefined}
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
