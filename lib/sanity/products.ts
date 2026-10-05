import { products as localProducts } from "@/data/products";
import type { Product } from "@/lib/types";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "./client";
import { urlFor } from "./image";
import {
  productBySlugQuery,
  productsByCategoryQuery,
  productsBySeriesQuery,
  productsQuery,
} from "./queries";

type SanityImage = { asset?: { _ref?: string } };

type SanityProduct = {
  _id: string;
  name?: string;
  slug?: string;
  price?: number;
  color?: string;
  details?: string;
  care?: string;
  size?: string;
  material?: string;
  weight?: string;
  image?: SanityImage;
  gallery?: SanityImage[];
  category?: string;
  series?: string;
};

function imageUrl(image?: SanityImage, width = 1200) {
  if (!image?.asset) return "/images/products/beach-1.png";
  return urlFor(image).width(width).auto("format").url();
}

function mapSanityProduct(item: SanityProduct): Product {
  const gallery =
    item.gallery
      ?.map((img) => imageUrl(img, 1600))
      .filter(Boolean) ?? [];

  return {
    id: item._id,
    name: item.name ?? "Untitled",
    slug: item.slug ?? item._id,
    description: item.details ?? "",
    price: item.price ?? 0,
    color: item.color,
    care: item.care,
    size: item.size,
    material: item.material,
    weight: item.weight,
    image: imageUrl(item.image),
    gallery: gallery.length ? gallery : undefined,
    category: item.category,
    series: item.series,
  };
}

async function fetchAllFromSanity(): Promise<Product[] | null> {
  if (!isSanityConfigured) return null;
  try {
    const rows = await sanityClient.fetch<SanityProduct[]>(
      productsQuery,
      {},
      { next: { revalidate: 30 } },
    );
    if (!rows?.length) return null;
    return rows.map(mapSanityProduct);
  } catch {
    return null;
  }
}

/** 전체 상품 */
export async function getProducts(): Promise<Product[]> {
  return (await fetchAllFromSanity()) ?? localProducts;
}

/** 시리즈별 상품 (시리즈 미지정 상품은 같은 카테고리 시리즈 페이지에도 표시) */
export async function getProductsBySeries(
  series: string,
  category?: string,
): Promise<Product[]> {
  if (!isSanityConfigured) {
    return localProducts.filter(
      (p) =>
        p.series === series ||
        (!p.series && category && p.category === category),
    );
  }

  try {
    const rows = await sanityClient.fetch<SanityProduct[]>(
      productsBySeriesQuery,
      { series, category: category ?? null },
      { next: { revalidate: 30 } },
    );
    if (!rows?.length) {
      return localProducts.filter(
        (p) =>
          p.series === series ||
          (!p.series && category && p.category === category),
      );
    }
    return rows.map(mapSanityProduct);
  } catch {
    return localProducts.filter(
      (p) =>
        p.series === series ||
        (!p.series && category && p.category === category),
    );
  }
}

/** 카테고리별 상품 */
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  if (!isSanityConfigured) {
    return localProducts.filter((p) => p.category === category);
  }

  try {
    const rows = await sanityClient.fetch<SanityProduct[]>(
      productsByCategoryQuery,
      { category },
      { next: { revalidate: 30 } },
    );
    if (!rows?.length) {
      return localProducts.filter((p) => p.category === category);
    }
    return rows.map(mapSanityProduct);
  } catch {
    return localProducts.filter((p) => p.category === category);
  }
}

/** slug로 상품 1개 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return localProducts.find((p) => p.slug === slug) ?? null;
  }

  try {
    const row = await sanityClient.fetch<SanityProduct | null>(
      productBySlugQuery,
      { slug },
      { next: { revalidate: 30 } },
    );
    if (row) return mapSanityProduct(row);
    return localProducts.find((p) => p.slug === slug) ?? null;
  } catch {
    return localProducts.find((p) => p.slug === slug) ?? null;
  }
}
