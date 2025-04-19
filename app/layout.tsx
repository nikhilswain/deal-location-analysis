import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deal Overview",
  description: "A screen presenting deal overview and analysis insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
