"use client";

import { MiniAppProvider as NeynarMiniAppProvider } from "@neynar/react";

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <NeynarMiniAppProvider analyticsEnabled={true}>
      {children}
    </NeynarMiniAppProvider>
  );
}
