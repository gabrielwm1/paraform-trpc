import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import styles from "./layout.module.css";
import { TRPCReactProvider } from "@/trpc/react";
import "./globals.css";

import { GeistMono } from "geist/font/mono";
export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} `}>
      <body className={`${styles.wrapper}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
