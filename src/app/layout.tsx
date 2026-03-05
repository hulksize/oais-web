import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oais | Digital Ruin Reconstruction",
  description: "낡은 디지털의 유산을 현대의 가치로 재건합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="antialiased bg-zinc-950">
        {children}
      </body>
    </html>
  );
}
