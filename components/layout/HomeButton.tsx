import Link from "next/link";

/**
 * 임시 홈 이동 버튼 (모든 사이트 페이지)
 * 나중에 정식 네비로 바꾸면 이 컴포넌트만 제거하면 됩니다.
 */
export default function HomeButton() {
  return (
    <Link
      href="/"
      className="fixed bottom-page-y left-page-x z-50 bg-foreground px-md py-sm text-sm font-medium text-background"
    >
      Home
    </Link>
  );
}
