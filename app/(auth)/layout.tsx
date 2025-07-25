import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { dark } from '@clerk/themes'
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MO Ecoomerce Store",
  description: "Admin dashboard to manage MO data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme : dark}}>
      <html lang="en">
        <body className={`${inter.className}`} >{children}</body>
      </html>
    </ClerkProvider>
  );
}
