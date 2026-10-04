import type { CategoryItem, NavItem } from "@/lib/types";

export const siteInfo = {
  name: "Towel",
  description: "Towel brand website",
};

/** Towel 서브 카테고리 (시리즈) */
export const towelSeries: NavItem[] = [
  { label: "The Hotel", href: "/towel/series/the-hotel" },
  { label: "Stripe Series", href: "/towel/series/stripe-series" },
  { label: "City Series", href: "/towel/series/city-series" },
  { label: "Embroidery Series", href: "/towel/series/embroidery-series" },
  { label: "Premium Series", href: "/towel/series/premium-series" },
  { label: "Melange Series", href: "/towel/series/melange-series" },
  { label: "Beach Towel", href: "/towel/series/beach-towel" },
  { label: "x Artist", href: "/towel/series/x-artist" },
];

/** Goods 서브 카테고리 (임시) */
export const goodsSeries: NavItem[] = [
  { label: "Bag", href: "/goods/series/bag" },
  { label: "Hat", href: "/goods/series/hat" },
  { label: "Accessories", href: "/goods/series/accessories" },
];

export const categories: CategoryItem[] = [
  {
    id: "towel",
    label: "Towel",
    href: "/towel",
    imageSrc: "/images/brand/categories/towel.png",
    imageWidth: 300,
    imageHeight: 96,
    subItems: towelSeries,
  },
  {
    id: "robe",
    label: "Robe",
    href: "/robe",
    imageSrc: "/images/brand/categories/robe.png",
    imageWidth: 300,
    imageHeight: 110,
  },
  {
    id: "mat",
    label: "Mat",
    href: "/mat",
    imageSrc: "/images/brand/categories/mat.png",
    imageWidth: 300,
    imageHeight: 143,
  },
  {
    id: "goods",
    label: "Goods",
    href: "/goods",
    imageSrc: "/images/brand/categories/goods.png",
    imageWidth: 300,
    imageHeight: 88,
    subItems: goodsSeries,
  },
  {
    id: "journal",
    label: "Journal",
    href: "/journal",
    imageSrc: "/images/brand/categories/journal.png",
    imageWidth: 300,
    imageHeight: 75,
  },
  {
    id: "custom",
    label: "Custom",
    href: "/custom",
    imageSrc: "/images/brand/categories/custom.png",
    imageWidth: 300,
    imageHeight: 73,
  },
];

export const utilityNav: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Cart", href: "/cart" },
  { label: "Search", href: "/search" },
];
