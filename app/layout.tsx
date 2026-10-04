import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { siteInfo } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: siteInfo.name,
  description: siteInfo.description,
};

/**
 * 최상위 레이아웃 (사이트 + Studio 공통)
 * Login/Cart 메뉴는 (site) 레이아웃에만 있습니다.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`}>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
