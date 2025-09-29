"use client";

import { appConfig } from "@/config/app";
import { posthogConfig } from "@/config/posthog";
import { useMiniApp } from "@neynar/react";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
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

  async function handleGetPremium() {
    posthog.capture(posthogConfig.events.getPremiumClicked);
    await actions.viewProfile({ fid: appConfig.developer.fid });
  }

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
                <DialogTitle>Get Real Alpha!</DialogTitle>
              </DialogHeader>
              <p>
                <span className="font-semibold">SharkScout Premium</span> turns
                your social graph into an alpha-generating machine
              </p>
              <p>
                <span className="font-semibold">📈 Trends:</span> Track the
                exact moves your network is making: buys, sells, swaps, mints,
                and airdrops
              </p>
              <p>
                <span className="font-semibold">💡 AI Insights:</span> Our AI
                analyzes your network to surface hidden gems, emerging
                narratives, and alpha opportunities
              </p>
              <p>
                <span className="font-semibold">🔔 Smart Notifications:</span>{" "}
                Be the first to know about trending tokens, whale accumulations,
                and market-moving activities
              </p>
              <Button onClick={handleGetPremium}>
                <PencilIcon /> Contact {appConfig.developer.name} To Get Access
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
