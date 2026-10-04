"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import ProductQuickView from "./ProductQuickView";

type ProductStripProps = {
  products: Product[];
  /** 시리즈 slug — beach-towel 이면 비치 전용 설정 */
  seriesSlug?: string;
  /** 카테고리 slug — 상세 링크용 (기본 towel) */
  categoryId?: string;
};

type PopupState = {
  product: Product;
  x: number;
  y: number;
  phase: "visible" | "leaving";
};

/**
 * 가로 스크롤 상품 열
 * 비치타월 / 일반 시리즈 설정은 app/globals.css 에서 따로 조절
 */
export default function ProductStrip({
  products,
  seriesSlug,
  categoryId = "towel",
}: ProductStripProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const popupRef = useRef<PopupState | null>(null);
  popupRef.current = popup;
  const isBeach = seriesSlug === "beach-towel";

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      el.scrollLeft += event.deltaY;
      event.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    return () => {
      if (showTimer.current) window.clearTimeout(showTimer.current);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const clearTimers = () => {
    if (showTimer.current) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const openPopup = (product: Product, x: number, y: number) => {
    clearTimers();
    if (popupRef.current) {
      setPopup({ product, x, y, phase: "visible" });
      return;
    }
    showTimer.current = window.setTimeout(() => {
      setPopup({ product, x, y, phase: "visible" });
      showTimer.current = null;
    }, 90);
  };

  const movePopup = (product: Product, x: number, y: number) => {
    if (!popupRef.current || popupRef.current.phase !== "visible") {
      openPopup(product, x, y);
      return;
    }
    setPopup({ product, x, y, phase: "visible" });
  };

  const closePopup = () => {
    clearTimers();
    setPopup((current) => {
      if (!current) return null;
      return { ...current, phase: "leaving" };
    });
    hideTimer.current = window.setTimeout(() => {
      setPopup(null);
      hideTimer.current = null;
    }, 280);
  };

  if (products.length === 0) {
    return (
      <p className="w-full text-center text-base text-muted">
        등록된 상품이 없습니다. Sanity Studio에서 Product를 추가해 주세요.
      </p>
    );
  }

  return (
    <div className="relative w-full">
      <ul
        ref={listRef}
        className={`product-strip flex items-center overflow-x-auto py-2 pl-[var(--spacing-shop-strip-left)] pr-[100px] ${
          isBeach ? "product-strip--beach" : "product-strip--default"
        }`}
        style={{
          gap: isBeach
            ? "var(--shop-beach-gap)"
            : "var(--shop-default-gap)",
        }}
      >
        {products.map((product) => (
          <li key={product.id} className="shrink-0">
            <Link
              href={`/${categoryId}/product/${product.slug}`}
              onMouseEnter={(event) => {
                openPopup(product, event.clientX, event.clientY);
              }}
              onMouseMove={(event) => {
                movePopup(product, event.clientX, event.clientY);
              }}
              onMouseLeave={closePopup}
              className="relative block overflow-hidden bg-background"
              style={{
                width: isBeach
                  ? "var(--shop-beach-width)"
                  : "var(--shop-default-width)",
                height: isBeach
                  ? "var(--shop-beach-height)"
                  : "var(--shop-default-height)",
              }}
              aria-label={product.name}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes={isBeach ? "25vw" : "20vw"}
                className="product-strip__image object-center"
              />
            </Link>
          </li>
        ))}
      </ul>

      {popup ? (
        <ProductQuickView
          product={popup.product}
          x={popup.x}
          y={popup.y}
          phase={popup.phase}
          categoryId={categoryId}
        />
      ) : null}
    </div>
  );
}
