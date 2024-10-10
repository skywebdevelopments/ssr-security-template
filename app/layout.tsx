import { Toaster } from "@/components/ui/sonner"

import "./globals.css";
import type { Metadata } from "next";
import { Inter, Bebas_Neue, Chakra_Petch } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Toaster expand={true} closeButton={true}  />
      </body>
    </html>
  );
}
