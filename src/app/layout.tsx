import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Securithum | Cybersecurity, GRC & Compliance — UK & India",
  description: "Cybersecurity, GRC and compliance solutions combining a cloud-native governance platform with practitioner-led advisory, assurance and technical security across the UK and India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
