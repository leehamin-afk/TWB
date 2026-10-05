"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const FRAME_W = 447;
const BUY_W = 41;
const FRAME_MAX_H = 370;
const OFFSET = 18;

/**
 * 상품 호버 팝업
 * 가로 447 / 세로 최대 370, 4px 블루 스트로크, 바깥 오른쪽 Buy
 */
export default function ProductQuickView({
  product,
  x,
  y,
  phase,
  categoryId = "towel",
}: ProductQuickViewProps) {
  const boxRef = useRef<HTMLDivElement>(null);
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
      setSwitching(false);
    }, 120);
    return () => window.clearTimeout(t);
  }, [product, displayProduct.id]);

  useEffect(() => {
    const height = boxRef.current?.offsetHeight ?? FRAME_MAX_H;
    const left = Math.min(
      x + OFFSET,
      window.innerWidth - FRAME_W - BUY_W - 16,
    );
    const top = Math.min(y + OFFSET, window.innerHeight - height - 16);
    setPos({
      left: Math.max(16, left),
      top: Math.max(16, top),
    });
  }, [x, y, displayProduct, switching]);

  const stateClass =
    phase === "leaving" ? "is-leaving" : shown ? "is-visible" : "";

  const colorName = displayProduct.color?.toUpperCase() ?? "";

  return (
    <div
      ref={boxRef}
      className={`quickview-popup pointer-events-none fixed z-50 bg-background ${stateClass}`}
      style={{
        left: pos.left,
        top: pos.top,
        width: "var(--quickview-width)",
        maxHeight: "var(--quickview-max-h)",
        padding: "var(--quickview-pad-y) var(--quickview-pad-x)",
        border: "4px solid var(--color-detail-bg)",
        boxSizing: "border-box",
      }}
      role="tooltip"
      aria-label={displayProduct.name}
    >
      <div
        className={`quickview-body flex min-h-0 flex-col ${
          switching ? "is-switching" : ""
        }`}
      >
        <Link href={detailHref} className="pointer-events-auto min-w-0">
          <h2 className="truncate text-[20px] font-semibold leading-[32px] text-foreground">
            {displayProduct.name}
          </h2>
        </Link>

        <p className="mt-[5px] text-[16px] font-medium leading-[24px] text-foreground">
          KRW {displayProduct.price.toLocaleString("ko-KR")}
        </p>

        <dl className="mt-[40px] grid min-h-0 grid-cols-[auto_1fr] gap-x-[40px] gap-y-0 text-[16px] font-medium leading-[24px] text-foreground">
          {colorName ? (
            <>
              <dt>Color</dt>
              <dd className="min-w-0 truncate uppercase">{colorName}</dd>
            </>
          ) : null}

          {displayProduct.description ? (
            <>
              <dt className="self-start">Details</dt>
              <dd className="quickview-details min-w-0 font-ko text-[16px] font-medium leading-[1.6] text-foreground">
                {displayProduct.description}
              </dd>
            </>
          ) : null}
        </dl>
      </div>

      {/* 바깥 오른쪽 — 상품명 시작선과 동일 / 41×32 Buy */}
      <Link
        href={detailHref}
        className="pointer-events-auto absolute top-[var(--quickview-pad-y)] left-[calc(100%+4px)] flex h-[32px] w-[41px] items-center justify-center bg-detail-bg text-[16px] font-semibold leading-none text-on-accent"
      >
        Buy
      </Link>
    </div>
  );
}
