import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sintaxis Lab | Auditoría de Memoria",
  description: "Simulador de degradación de memoria caché - Equipo 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-fucsia-lab selection:text-white min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
