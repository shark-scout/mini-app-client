import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Left part */}
        <div className="flex gap-2 md:gap-10">
          <Link href="/" className="flex items-center space-x-3">
            <p className="font-bold">
              {siteConfig.emoji} {siteConfig.name}{" "}
            </p>
          </Link>
        </div>
        {/* Right part */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* TODO: Display a block about premium features */}
          <Button variant="outline">Get Premium</Button>
        </div>
      </div>
    </header>
  );
}
