import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * 사이트에서 Sanity 데이터를 읽어오는 클라이언트입니다.
 * 아직 projectId를 넣지 않았다면 로컬 data/ 를 계속 사용하면 됩니다.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // 스튜디오에서 방금 Publish한 상품이 바로 보이게 CDN 끄기
  useCdn: false,
});
