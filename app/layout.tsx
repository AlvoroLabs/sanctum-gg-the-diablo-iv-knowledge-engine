import type { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sanctum | Diablo IV Decision Engine",
  description:
    "Sanctum diagnoses weak Diablo IV builds, prioritizes upgrades, and persists progression intelligence for players over time.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
