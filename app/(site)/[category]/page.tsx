import { notFound, redirect } from "next/navigation";
import ShopShell from "@/components/shop/ShopShell";
import ProductStrip from "@/components/shop/ProductStrip";
import {
  categorySlugs,
  getCategoryBySlug,
  getSeriesForCategory,
} from "@/lib/catalog";
import { getProductsByCategory } from "@/lib/sanity/products";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

/**
 * /goods, /robe 등
 * 시리즈가 있으면 첫 시리즈로 이동, 없으면 카테고리 전체 상품 표시
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const seriesItems = getSeriesForCategory(categorySlug);
  const firstSeries = seriesItems[0];

  if (firstSeries) {
    redirect(firstSeries.href);
  }

  const products = await getProductsByCategory(categorySlug);

  return (
    <ShopShell categoryId={category.id} seriesItems={seriesItems}>
      <ProductStrip products={products} categoryId={category.id} />
    </ShopShell>
  );
}
