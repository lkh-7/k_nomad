import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOREA NOMAD | 한국 디지털 노마드 도시 랭킹",
  description:
    "한국 디지털 노마드, 한달살기 도시 추천. 제주, 부산, 강릉 등 도시별 인터넷 속도, 생활비, 카공 환경을 한눈에 비교하세요.",
  keywords: [
    "한국 디지털 노마드",
    "한달살기 도시 추천",
    "워케이션",
    "디지털노마드",
    "제주 한달살기",
    "강릉 노마드",
    "부산 워케이션",
  ],
  openGraph: {
    title: "KOREA NOMAD | 한국 디지털 노마드 도시 랭킹",
    description:
      "한국 내 디지털 노마드를 위한 도시 정보 허브. 인터넷 속도, 생활비, 카공 환경을 실시간으로 비교하세요.",
    type: "website",
    locale: "ko_KR",
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
      className={`dark ${bebasNeue.variable} ${spaceMono.variable} ${notoSansKR.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
