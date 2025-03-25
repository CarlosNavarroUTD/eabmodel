import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "EABMODEL - Soluciones Tecnológicas Inteligentes",
  description: "Potenciamos tu empresa con tecnología inteligente y modelos de negocio innovadores",
  metadataBase: new URL('https://eabmodel.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-codecCold antialiased bg-background text-white min-h-screen">
        <Navbar />
        <div className="pt-16 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </body>
    </html>
  );
}