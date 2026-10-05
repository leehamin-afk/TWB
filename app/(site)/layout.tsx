import BrandMark from "@/components/layout/BrandMark";
import UtilityNav from "@/components/layout/UtilityNav";

/**
 * 쇼핑몰 화면용 레이아웃
 * Studio(/studio)에는 적용되지 않습니다.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <UtilityNav />
      <BrandMark />
    </>
  );
}
