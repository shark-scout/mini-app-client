"use client";

import { appConfig } from "@/config/app";
import { Button } from "./ui/button";
import { useMiniApp } from "@neynar/react";

export function Footer() {
  const { actions } = useMiniApp();

  return (
    <footer className="bg-background border-t py-6 md:py-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <p className="text-balance text-center md:text-left text-sm leading-loose text-muted-foreground">
          Built by
          <Button
            variant="link"
            onClick={() =>
              actions.viewProfile({ fid: appConfig.developer.fid })
            }
            className="p-1"
          >
            {appConfig.developer.name}
          </Button>
          © 2025
        </p>
      </div>
    </footer>
  );
}
