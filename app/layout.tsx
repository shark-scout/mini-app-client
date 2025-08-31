import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Identifier } from "@/components/identifier";
import { MiniAppProvider } from "@/components/mini-app-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Fira_Code, Outfit } from "next/font/google";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${appConfig.name} - ${appConfig.description}`,
    template: `%s - ${appConfig.name}`,
  },
  description: appConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          outfit.variable,
          firaCode.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <MiniAppProvider>
            <Identifier />
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
            <Toaster />
          </MiniAppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
