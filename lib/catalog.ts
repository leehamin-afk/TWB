import { categories } from "@/data/site";
import type { CategoryItem, NavItem } from "@/lib/types";

/** 유효한 카테고리 slug 목록 */
export const categorySlugs = categories.map((item) => item.id);

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return categories.find((item) => item.id === slug);
}

export function getSeriesForCategory(slug: string): NavItem[] {
  return getCategoryBySlug(slug)?.subItems ?? [];
}

export function isCategorySlug(slug: string): boolean {
  return categorySlugs.includes(slug);
}
