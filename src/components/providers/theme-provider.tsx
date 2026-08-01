"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}






// | Use             | Light     | Dark      |
// | --------------- | --------- | --------- |
// | Main Background | `#FBFCFE` | `#0F172A` |
// | Card            | `#FFFFFF` | `#111827` |
// | Border          | `#E5E7EB` | `#374151` |
// | Text            | `#111827` | `#F9FAFB` |
// | Secondary Text  | `#6B7280` | `#9CA3AF` |
