import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/commerce/CartProvider";

const archivo = localFont({
  src: "../../public/fonts/archivo.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
});

const instrument = localFont({
  src: "../../public/fonts/instrument.woff2",
  variable: "--font-instrument",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "Piura — Eternal summer between two coasts",
  description: "A Piura Swim commerce concept: designed in Miami, crafted in Peru.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${archivo.variable} ${instrument.variable}`}><body><CartProvider>{children}</CartProvider></body></html>;
}
