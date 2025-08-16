"use client";

import { Separator } from "@/components/ui/separator";
import { useMiniApp } from "@neynar/react";

export default function HomePage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold">Welcome to SharkScout!</h1>
      <Separator className="my-4" />
      <ContextPreview />
    </main>
  );
}

function ContextPreview() {
  const { isSDKLoaded, context } = useMiniApp();

  return (
    <div className="flex flex-col gap-2">
      <p>Context:</p>
      {isSDKLoaded ? (
        <pre>{JSON.stringify(context, null, 2) || "Null"}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
