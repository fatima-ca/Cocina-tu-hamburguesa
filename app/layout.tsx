import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CronometroProvider } from "@/components/cocina/cocinar/CronometroContext";
import { IngredientesProvider } from "@/components/cocina/ingredientes/IngredientesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cocina tu hamburguesa",
  description: "Sigue los pasos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IngredientesProvider>
          <CronometroProvider>{children}</CronometroProvider>
        </IngredientesProvider>
      </body>
    </html>
  );
}
