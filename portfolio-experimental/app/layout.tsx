import type { Metadata } from "next";
import "./globals.css";
import ExperimentalCursor from "./components/Cursor/ExperimentalCursor";

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.webp',
    apple: '/favicon.webp',
  },
  title: "Juan Cruz Larraya — Ingeniería & Herramientas",
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
    <html lang="es">
      <body className="antialiased">
        <ExperimentalCursor />
        {children}
      </body>
    </html>
  );
}
