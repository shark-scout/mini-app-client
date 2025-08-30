"use client";

import { appConfig } from "@/config/app";
import { useMiniApp } from "@neynar/react";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function Header() {
  const { actions } = useMiniApp();

  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Left part */}
        <div className="flex gap-2 md:gap-10">
          <Link href="/" className="flex items-center space-x-3">
            <p className="font-bold">
              {appConfig.emoji} {appConfig.name}{" "}
            </p>
          </Link>
        </div>
        {/* Right part */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Get Premium</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-left">
                <DialogTitle>Go Beyond the Memes!</DialogTitle>
              </DialogHeader>
              <p className="font-semibold">Get Real Alpha!</p>
              <p>
                SharkScout Premium turns your social graph into an
                alpha-generating machine
              </p>
              <p>
                📈 Network Trading Trends: See what your network is
                buying/selling in real-time
              </p>
              <p>
                🤖 AI Insights: Get signals on which wallets are making the
                smartest moves
              </p>
              <p>
                🔔 Smart Alerts: Get notified when a key account makes a big
                trade
              </p>
              <Button
                onClick={() =>
                  actions.viewProfile({ fid: appConfig.developer.fid })
                }
              >
                <PencilIcon /> Contact {appConfig.developer.name} To Get Access
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
