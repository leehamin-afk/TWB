import type { ReactNode } from "react";

type PageGridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 12컬럼 그리드 컨테이너입니다.
 * 마진/거터는 app/globals.css 의
 * --spacing-page-x, --spacing-page-y, --spacing-gutter 를 따릅니다.
 */
export default function PageGrid({ children, className = "" }: PageGridProps) {
  return <div className={`page-grid ${className}`.trim()}>{children}</div>;
}
