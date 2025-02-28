import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarkMaps - AI-Powered Mind Mapping",
  description: "Generate markdown documents and mind maps using Claude 3.7 Sonnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            {children}
          </div>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
