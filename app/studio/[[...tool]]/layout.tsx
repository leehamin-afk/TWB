/**
 * Studio는 Sanity 자체 UI를 쓰므로
 * 사이트 Header/UtilityNav 없이 전체 화면으로 엽니다.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ margin: 0, height: "100vh", maxHeight: "100dvh" }}>
      {children}
    </div>
  );
}
