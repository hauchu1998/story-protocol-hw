"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientConfig } from "@/configs/queryClient";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/configs/wagmi";
import { Press_Start_2P } from "next/font/google";
import { Toaster } from "@/components/sonner";
import "./globals.css";

export const pressStart2P = Press_Start_2P({
  display: "swap",
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        <Toaster richColors />
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClientConfig}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
