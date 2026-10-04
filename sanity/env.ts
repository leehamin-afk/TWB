/**
 * Sanity 연결에 필요한 환경변수입니다.
 * 실제 값은 .env.local 에 넣고, 코드에는 직접 비밀키를 쓰지 않습니다.
 */

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yourProjectId";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/** 프로젝트 ID가 아직 설정되지 않았는지 */
export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "yourProjectId";
