"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

type ProductQuickViewProps = {
  product: Product;
  /** 화면 좌표 (clientX / clientY) */
  x: number;
  y: number;
  /** 떠 있는 중 / 사라지는 중 */
  phase: "visible" | "leaving";
  categoryId?: string;
};

const FRAME_W = 520;
const FRAME_H = 280;
const OFFSET = 18;

/**
 * 상품 호버 팝업 — 마우스를 따라다님 (부드러운 페이드)
 * 프레임: public/images/common/product-quickview-frame.svg
 */
export default function ProductQuickView({
  product,
  x,
  y,
  phase,
  categoryId = "towel",
}: ProductQuickViewProps) {
  const [qty, setQty] = useState(1);
  const [pos, setPos] = useState({ left: x + OFFSET, top: y + OFFSET });
  const [shown, setShown] = useState(false);
  const [displayProduct, setDisplayProduct] = useState(product);
  const [switching, setSwitching] = useState(false);
  const detailHref = `/${categoryId}/product/${displayProduct.slug}`;

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (product.id === displayProduct.id) return;

    setSwitching(true);
    const t = window.setTimeout(() => {
      setDisplayProduct(product);
      setQty(1);
      setSwitching(false);
    }, 160);
    return () => window.clearTimeout(t);
  }, [product, displayProduct.id]);

  useEffect(() => {
    const left = Math.min(x + OFFSET, window.innerWidth - FRAME_W - 16);
    const top = Math.min(y + OFFSET, window.innerHeight - FRAME_H - 16);
    setPos({
      left: Math.max(16, left),
      top: Math.max(16, top),
    });
  }, [x, y]);

  const stateClass =
    phase === "leaving"
      ? "is-leaving"
      : shown
        ? "is-visible"
        : "";

  return (
    <div
      className={`quickview-popup pointer-events-none fixed z-50 ${stateClass}`}
      style={{ left: pos.left, top: pos.top, width: FRAME_W, height: FRAME_H }}
      role="tooltip"
      aria-label={displayProduct.name}
    >
      <Image
        src="/images/common/product-quickview-frame.svg"
        alt=""
        width={FRAME_W}
        height={FRAME_H}
        className="pointer-events-none absolute inset-0 h-full w-full"
        unoptimized
      />

      <div
        className={`quickview-body relative z-10 flex h-full flex-col p-md pr-16 ${
          switching ? "is-switching" : ""
        }`}
      >
        <div className="min-w-0">
          <Link href={detailHref} className="pointer-events-auto block">
            <h2 className="text-product font-semibold leading-[var(--text-product--line-height)] text-foreground">
              {displayProduct.name}
            </h2>
          </Link>

          <div className="mt-sm flex items-center gap-lg">
            <p className="text-base font-medium underline decoration-1 underline-offset-4">
              KRW {displayProduct.price.toLocaleString("ko-KR")}
            </p>

            <div
              className="pointer-events-auto flex items-center gap-sm text-base"
              aria-label="수량"
            >
              <button
                type="button"
                className="px-1"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                aria-label="수량 감소"
              >
                -
              </button>
              <span>{qty}</span>
              <button
                type="button"
                className="px-1"
                onClick={() => setQty((n) => n + 1)}
                aria-label="수량 증가"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <Link
          href={detailHref}
          className="pointer-events-auto absolute top-md right-0 translate-x-[calc(100%-2px)] bg-accent px-3 py-1.5 text-sm font-medium text-on-accent"
        >
          Buy
        </Link>

        <dl className="mt-md grid min-h-0 flex-1 grid-cols-[72px_1fr] gap-x-md gap-y-sm overflow-hidden text-base">
          {displayProduct.color ? (
            <>
              <dt className="text-muted">Color</dt>
              <dd className="text-foreground">{displayProduct.color}</dd>
            </>
          ) : null}
          {displayProduct.description ? (
            <>
              <dt className="text-muted">Details</dt>
              <dd className="font-ko leading-body text-foreground line-clamp-5">
                {displayProduct.description}
              </dd>
            </>
          ) : null}
          <dt className="text-muted">Care</dt>
          <dd className="font-ko leading-body text-muted line-clamp-2">
            {displayProduct.care || ""}
          </dd>
        </dl>
      </div>
    </div>
  );
}
