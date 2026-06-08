import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vdcode.site"),
  title: "VD | 비주얼 디자인 커리어 컨설팅",
  description: "당신의 포트폴리오를 최상위 기업이 원하는 수준으로. VD는 비주얼 디자이너를 위한 프리미엄 커리어 컨설팅 서비스입니다.",
  keywords: ["비주얼 디자인", "커리어 컨설팅", "포트폴리오", "UX디자인", "UI디자인", "취업"],
  openGraph: {
    title: "VD | 비주얼 디자인 커리어 컨설팅",
    description: "당신의 포트폴리오를 최상위 기업이 원하는 수준으로",
    url: "https://vdcode.site",
    siteName: "VD Career Consulting",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "VD | 비주얼 디자인 커리어 컨설팅",
    description: "당신의 포트폴리오를 최상위 기업이 원하는 수준으로",
  },
  alternates: {
    canonical: "https://vdcode.site",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
