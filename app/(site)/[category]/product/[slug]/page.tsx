import { notFound } from "next/navigation";
import ProductDetailLayout from "@/components/shop/ProductDetailLayout";
import {
  categorySlugs,
  getCategoryBySlug,
  getSeriesForCategory,
} from "@/lib/catalog";
import { getProductBySlug, getProducts } from "@/lib/sanity/products";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.flatMap((product) => {
    const category = product.category ?? "towel";
    if (!categorySlugs.includes(category)) return [];
    return [{ category, slug: product.slug }];
  });
}

/**
 * /towel/product/..., /goods/product/... 상세
 */
export default async function CategoryProductPage({ params }: PageProps) {
  const { category: categorySlug, slug } = await params;

  if (!getCategoryBySlug(categorySlug)) notFound();

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const extra =
    product.gallery?.filter((src) => src && src !== product.image) ?? [];
  const gallery = [product.image, ...extra];
  const seriesItems = getSeriesForCategory(categorySlug);

  return (
    <ProductDetailLayout
      product={product}
      gallery={gallery}
      categoryId={categorySlug}
      seriesItems={seriesItems}
    />
  );
}
