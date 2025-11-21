import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/query";

export const metadata: Metadata = {
  title: "Munchies!",
  description: "Solve your food cravings with Munchies!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
