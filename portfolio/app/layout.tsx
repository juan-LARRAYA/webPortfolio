import type { Metadata } from "next";
import "./globals.css";
import ExperimentalCursor from "./components/Cursor/ExperimentalCursor";
import { LangProvider } from "@/lib/i18n/LangContext";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
  title: "Juan Cruz Larraya - developer",
  description: "Ingeniero Electrónico (FIUBA). Automatización industrial, desarrollo web y herramientas interactivas de electrónica y programación.",
  keywords: ["ingeniería electrónica", "automatización", "herramientas online", "conversor binario", "PLC", "FIUBA", "portfolio"],
  authors: [{ name: "Juan Cruz Larraya" }],
  metadataBase: new URL("https://juanlarraya.com.ar"),
  openGraph: {
    title: "Juan Cruz Larraya — Ingeniería & Herramientas",
    description: "Ingeniero Electrónico. Herramientas interactivas para electrónica y programación industrial.",
    type: "website",
    url: "https://juanlarraya.com.ar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Cruz Larraya — Ingeniería & Herramientas",
    description: "Ingeniero Electrónico. Herramientas interactivas para electrónica y programación industrial.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className="antialiased">
        <LangProvider>
          <ExperimentalCursor />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
