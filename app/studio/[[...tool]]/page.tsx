"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

/**
 * Sanity 관리자 화면
 * 주소: http://localhost:3000/studio
 *
 * 상품/카테고리를 여기서 추가·수정합니다.
 * (NEXT_PUBLIC_SANITY_PROJECT_ID 설정 후 사용)
 */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
