import { siteConfig } from "@/config/site";
import { GithubIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
          <div className="bg-accent flex items-center border rounded-lg px-2 py-1">
            <p className="text-sm font-bold text-accent-foreground">Beta</p>
          </div>
        </div>
        {/* Right part */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* TODO: Add user avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="text-sm font-medium text-muted-foreground"
              asChild
            >
              <Button variant="ghost" size="icon">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={siteConfig.links.github} target="_blank">
                <DropdownMenuItem>
                  <GithubIcon />
                  <span>GitHub</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
