"use client";

import Image from "next/image";
import AboutTowel from "@/components/home/AboutTowel";
import type { Product } from "@/lib/types";

type HomeSpotProps = {
  product: Product | null;
  isDragging?: boolean;
};

/**
 * About 자리 — 카테고리/시리즈 호버 시 랜덤 상품이 0.3초로 교차 등장
 * 위치: 왼쪽 20px / 하단 30px (WipeDraggable)
 * 상품 높이 상한: 360px
 */
export default function HomeSpot({
  product,
  isDragging = false,
}: HomeSpotProps) {
  return (
    <div className="relative bg-transparent">
      <div
        className={`home-spot-layer ${
          product
            ? "is-hidden absolute bottom-0 left-0"
            : "is-visible relative"
        }`}
      >
        <div className="relative w-[559px] max-w-[40vw] aspect-[1024/486] bg-transparent">
          <AboutTowel isDragging={isDragging} />
        </div>
      </div>

      <div
        className={`home-spot-layer ${
          product
            ? "is-visible relative"
            : "is-hidden absolute bottom-0 left-0"
        }`}
        aria-hidden={!product}
      >
        {product ? (
          <Image
            key={product.id}
            src={product.image}
            alt={product.name}
            width={1200}
            height={360}
            sizes="(max-width: 900px) 80vw, 900px"
            className="h-auto w-auto max-h-[var(--size-home-preview-max-h)] object-contain object-left-bottom"
            draggable={false}
            priority
          />
        ) : null}
      </div>
    </div>
  );
}
