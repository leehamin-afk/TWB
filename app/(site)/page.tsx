import MainStage from "@/components/home/MainStage";
import { getProducts } from "@/lib/sanity/products";

/**
 * 메인 페이지
 * 영상 루프 + 김서림 드래그 효과는 MainStage에서 처리합니다.
 */
export default async function HomePage() {
  const products = await getProducts();
  return <MainStage products={products} />;
}
