import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-background border-t py-6 md:py-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <p className="text-balance text-center md:text-left text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <a
            href={siteConfig.links.farcaster}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary"
          >
            kiv1n
          </a>{" "}
          © 2025
        </p>
      </div>
    </footer>
  );
}
