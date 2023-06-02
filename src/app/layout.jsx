import "./globals.css";

import React from "react";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";

export const metadata = {
  title: "WePresto - Préstamos en línea",
  description:
    "La plataforma de préstamos colaborativos que ofrece las mejores tasas del mercado. Pide prestado y paga a una tasa de interés baja. Invierte y obtén una rentabilidad por tu dinero mes a mes.",
  themeColor: "#fff",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://wepresto.com/",
    title: "WePresto - Préstamos en línea",
    description:
      "La plataforma de préstamos colaborativos que ofrece las mejores tasas del mercado. Pide prestado y paga a una tasa de interés baja. Invierte y obtén una rentabilidad por tu dinero mes a mes.",
    images: [
      {
        url: "https://wepresto.com/banner_meta.png",
        width: 1200,
        height: 630,
        alt: "WePresto - Préstamos en línea",
      },
    ],
  },
  twitter: {
    title: "WePresto - Préstamos en línea",
    description:
      "La plataforma de préstamos colaborativos que ofrece las mejores tasas del mercado. Pide prestado y paga a una tasa de interés baja. Invierte y obtén una rentabilidad por tu dinero mes a mes.",
    images: ["https://wepresto.com/banner_meta.png"],
  },
  icons: {
    other: {
      rel: "/icon.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
