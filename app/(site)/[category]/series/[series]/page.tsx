import { notFound } from "next/navigation";
import ShopShell from "@/components/shop/ShopShell";
import ProductStrip from "@/components/shop/ProductStrip";
import {
  categorySlugs,
  getCategoryBySlug,
  getSeriesForCategory,
} from "@/lib/catalog";
import { getProductsBySeries } from "@/lib/sanity/products";

type PageProps = {
  params: Promise<{ category: string; series: string }>;
};

export function generateStaticParams() {
  return categorySlugs.flatMap((category) => {
    const seriesItems = getSeriesForCategory(category);
    if (seriesItems.length === 0) return [];
    return seriesItems.map((item) => ({
      category,
      series: item.href.split("/").pop() ?? "",
    }));
  });
}

/**
 * /goods/series/bag, /towel/series/beach-towel 등
 */
export default async function CategorySeriesPage({ params }: PageProps) {
  const { category: categorySlug, series } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const seriesItems = getSeriesForCategory(categorySlug);
  const products = await getProductsBySeries(series, categorySlug);

  return (
    <ShopShell
      categoryId={category.id}
      seriesItems={seriesItems}
      activeSeriesSlug={series}
    >
      <ProductStrip
        products={products}
        seriesSlug={series}
        categoryId={category.id}
      />
    </ShopShell>
  );
}
