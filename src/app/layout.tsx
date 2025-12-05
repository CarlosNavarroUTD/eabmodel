import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className="font-codecCold antialiased bg-background text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16 flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}