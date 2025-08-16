"use client";

import { useMiniApp } from "@neynar/react";

export default function PlaygroundPage() {
  const { isSDKLoaded, context } = useMiniApp();

  console.log("Context:", context);

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      {isSDKLoaded ? (
        <p>Context: {JSON.stringify(context, null, 2)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
