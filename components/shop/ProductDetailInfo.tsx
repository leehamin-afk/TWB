"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";

type ProductDetailInfoProps = {
  product: Product;
};

/**
 * 상세 페이지 오른쪽 정보 패널
 */
export default function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const [qty, setQty] = useState(1);

  const careLines = product.care
    ? product.care
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  /** 자릿수가 늘면 - N + 사이 갭만 줄임 (왼쪽 끝·N 중앙 유지) */
  const qtyGap = useMemo(() => {
    const digits = String(qty).length;
    if (digits <= 1) return 25;
    return Math.max(6, 25 - (digits - 1) * 7);
  }, [qty]);

  const qtySlotCh = useMemo(() => {
    const digits = String(qty).length;
    return Math.max(1, digits);
  }, [qty]);

  return (
    <div className="product-detail-info flex h-full min-h-0 flex-col">
      <div>
        <h1 className="text-[28px] font-medium leading-[38px] text-foreground">
          {product.name}
        </h1>
        {product.color ? (
          <p className="text-[16px] font-medium leading-[38px] text-[#ABABAB]">
            {product.color}
          </p>
        ) : null}
      </div>

      <div className="mt-[40px]">
        <div className="flex items-center text-[16px] font-medium leading-[26px] text-foreground">
          <span>Price</span>
          <span className="ml-[86px]">
            {product.price > 0
              ? `₩${product.price.toLocaleString("ko-KR")}`
              : ""}
          </span>

          <div
            className="ml-[282px] flex shrink-0 items-center"
            style={{ gap: qtyGap }}
            aria-label="수량"
          >
            <button
              type="button"
              onClick={() => setQty((n) => Math.max(1, n - 1))}
              aria-label="수량 감소"
            >
              -
            </button>
            <span
              className="inline-block text-center"
              style={{ width: `${qtySlotCh}ch`, minWidth: "1ch" }}
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((n) => n + 1)}
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
        </div>

        {/* Price ↔ 스트로크 14px / 스트로크는 텍스트 박스보다 좌우 2px 김 */}
        <div
          className="product-detail-stroke mt-[14px]"
          aria-hidden="true"
        />
      </div>

      <div className="mt-[14px] grid grid-cols-[auto_1fr] gap-x-[86px] text-[16px] font-medium leading-[26px] text-foreground">
        <span>Detail</span>
        <div className="min-w-0">
          {product.description ? (
            <p className="font-ko text-[16px] font-medium leading-[1.75] text-foreground">
              {product.description}
            </p>
          ) : null}

          <ul className="mt-[14px] space-y-0 text-[16px] font-medium leading-[26px] text-foreground">
            {product.material ? <li>{product.material}</li> : null}
            {product.size ? <li>{product.size}</li> : null}
            {product.weight ? <li>{product.weight}</li> : null}
          </ul>

          {careLines.length > 0 ? (
            <div className="mt-[14px] space-y-0 font-ko text-[16px] font-medium leading-[1.75] text-foreground">
              {careLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
