import Image from "next/image";
import type { Product } from "@/lib/types";
import PageGrid from "@/components/layout/PageGrid";
import ProductDetailInfo from "./ProductDetailInfo";

type ProductDetailLayoutProps = {
  product: Product;
  gallery: string[];
};

/**
 * 상세 페이지 (Figma)
 * - 파란 바탕 + 흰 패널 2개 (이미지 7 / 텍스트 5)
 * - 여백·거터 20px로 파란 프레임이 보임
 */
export default function ProductDetailLayout({
  product,
  gallery,
}: ProductDetailLayoutProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-detail-bg">
      <div
        className="product-detail-frame relative w-full max-w-[var(--frame-width)] overflow-hidden"
        style={{ height: "min(var(--frame-height), 100svh)" }}
      >
        <PageGrid className="page-grid--shop page-grid--detail relative z-10 grid-rows-1">
          {/* 이미지 7컬럼 */}
          <div className="product-detail-gallery col-span-7 h-full min-h-0 overflow-y-auto overscroll-contain bg-background">
            <div className="flex flex-col gap-gutter py-page-y">
              {gallery.map((src, index) => (
                <Image
                  key={`${src}-${index}`}
                  src={src}
                  alt={`${product.name} ${index + 1}`}
                  width={1600}
                  height={2000}
                  sizes={index === 0 ? "40vw" : "58vw"}
                  className={
                    index === 0
                      ? "mx-auto h-auto w-[68%] object-contain"
                      : "h-auto w-full object-contain"
                  }
                  priority={index === 0}
                />
              ))}
            </div>
          </div>

          {/* 텍스트 5컬럼 */}
          <div className="col-span-5 flex h-full min-h-0 flex-col justify-start overflow-hidden bg-background px-md py-page-y pr-[120px]">
            <ProductDetailInfo product={product} />
          </div>
        </PageGrid>
      </div>
    </div>
  );
}
