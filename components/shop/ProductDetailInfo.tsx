"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

type ProductDetailInfoProps = {
  product: Product;
};

/**
 * 상세 페이지 오른쪽 정보 (Figma)
 * 제목 → 컬러 → Price / 수량 → Detail 설명·스펙·케어
 */
export default function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const [qty, setQty] = useState(1);
  const careLines = product.care
    ? product.care
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="flex flex-col">
      <h1 className="text-product font-semibold uppercase tracking-normal text-foreground">
        {product.name}
      </h1>

      {product.color ? (
        <p className="mt-sm text-base font-normal uppercase tracking-normal text-muted">
          {product.color}
        </p>
      ) : null}

      <div className="mt-lg flex items-center gap-md text-base">
        <span>Price</span>
        {product.price > 0 ? (
          <span className="font-medium">
            ₩{product.price.toLocaleString("ko-KR")}
          </span>
        ) : null}

        <div className="ml-auto flex items-center gap-sm" aria-label="수량">
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

      <div className="mt-md border-t border-detail-bg/35 pt-md">
        <dl className="grid grid-cols-[72px_1fr] gap-x-md text-base">
          <dt className="text-foreground">Detail</dt>
          <dd className="min-w-0">
            {product.description ? (
              <p className="font-ko leading-body text-foreground">
                {product.description}
              </p>
            ) : null}

            <ul className="mt-md space-y-sm uppercase tracking-normal">
              {product.material ? (
                <li>MATERIAL: {product.material}</li>
              ) : null}
              {product.size ? <li>SIZE: {product.size}</li> : null}
            </ul>

            {careLines.length > 0 ? (
              <div className="mt-md space-y-sm font-ko text-sm leading-body text-muted">
                {careLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}
          </dd>
        </dl>
      </div>
    </div>
  );
}
