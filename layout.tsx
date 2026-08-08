import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Store",
  description: "اختر الباقة المناسبة لك — تفعيل فوري لأشهر أدوات الذكاء الاصطناعي والبرامج.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
