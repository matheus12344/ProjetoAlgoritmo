import type { Metadata } from "next";
import { DM_Sans, Libre_Baskerville } from "next/font/google";
import styles from "./program-layout.module.css";

const dmSans = DM_Sans({
  variable: "--font-program-sans",
  subsets: ["latin"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-program-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.andrefiker.com.br"),
};

export default function ProgramRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${dmSans.variable} ${libreBaskerville.variable} ${styles.programBody}`}
      >
        {children}
      </body>
    </html>
  );
}
