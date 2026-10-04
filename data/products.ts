import type { Product } from "@/lib/types";

/**
 * 로컬 샘플 상품 (Sanity에 상품이 없을 때 디자인 확인용)
 * Sanity Studio에서 Publish하면 CMS 상품으로 바뀝니다.
 */

export const products: Product[] = [
  {
    id: "local-1",
    name: "BEACH TOWEL - SLIM STRIPE",
    slug: "beach-slim-stripe-blue",
    description:
      "얇은 스트라이프가 인상적인 비치 타월. 40수 100% 면사로 부드러운 촉감을 선사합니다.",
    price: 49000,
    color: "LIGHT BLUE",
    care: "찬물 세탁 / 그늘 건조를 권장합니다.",
    size: "70 X 140 cm (± 2cm)",
    material: "100% Cotton",
    image: "/images/products/beach-1.png",
    gallery: [
      "/images/products/beach-1.png",
      "/images/products/beach-3.png",
      "/images/products/beach-5.png",
    ],
    category: "towel",
    series: "beach-towel",
  },

  {
    id: "local-2",
    name: "BEACH TOWEL - FRAME",
    slug: "beach-frame-yellow",
    description: "그래픽 프레임 패턴의 비치 타월.",
    price: 52000,
    color: "YELLOW / CYAN",
    image: "/images/products/beach-2.png",
    category: "towel",
    series: "beach-towel",
  },
  {
    id: "local-3",
    name: "BEACH TOWEL - WIDE STRIPE",
    slug: "beach-wide-stripe",
    description: "넓은 스트라이프 비치 타월.",
    price: 49000,
    color: "BLUE",
    image: "/images/products/beach-3.png",
    category: "towel",
    series: "beach-towel",
  },
  {
    id: "local-4",
    name: "BEACH TOWEL - RED STRIPE",
    slug: "beach-red-stripe",
    description: "레드 슬림 스트라이프 비치 타월.",
    price: 49000,
    color: "RED",
    image: "/images/products/beach-4.png",
    category: "towel",
    series: "beach-towel",
  },
  {
    id: "local-5",
    name: "BEACH TOWEL - NAVY",
    slug: "beach-navy",
    description: "네이비 텍스처 비치 타월.",
    price: 55000,
    color: "NAVY",
    image: "/images/products/beach-5.png",
    category: "towel",
    series: "beach-towel",
  },
  {
    id: "local-6",
    name: "Stripe - Stripe Face N Brown 5P SET",
    slug: "stripe-face-n-brown-5p",
    description:
      "면을 염색하지 않은 목화 본연의 색상과 세 줄의 컬러 스트라이프가 인상적인 타월. 스트라이프 시리즈는 군더더기 없는 깔끔한 디자인으로 욕실 인테리어를 돋보이게 합니다. 40수 100% 면사를 사용하여 피부에 닿는 촉감이 부드러우며 면적 대비 높은 중량으로 오랜 기간 사용해도 쉽게 얇아지지 않습니다.",
    price: 60800,
    color: "N BROWN",
    care: "찬물 세탁 / 표백제 사용을 피해주세요.",
    size: "페이스 타월 5P",
    material: "40수 100% Cotton",
    image: "/images/products/beach-4.png",
    category: "towel",
    series: "stripe-series",
  },
];
