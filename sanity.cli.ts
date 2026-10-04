import { defineCliConfig } from "sanity/cli";

/**
 * Sanity CLI 설정
 * 터미널에서 sanity 명령어를 쓸 때 사용합니다.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yourProjectId",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
