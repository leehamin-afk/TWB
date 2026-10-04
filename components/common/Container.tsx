import type { ReactNode } from "react";
import PageGrid from "@/components/layout/PageGrid";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 페이지 공통 컨테이너 (12컬럼 그리드)
 * 마진/거터는 globals.css 토큰을 따릅니다.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return <PageGrid className={className}>{children}</PageGrid>;
}
