"use client";

import { useMiniApp } from "@neynar/react";

export default function PlaygroundUtilsPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <ContextPlayground />
    </main>
  );
}

function ContextPlayground() {
  const { isSDKLoaded, context } = useMiniApp();

  return (
    <div className="flex flex-col gap-2">
      <p>Context:</p>
      {isSDKLoaded ? (
        <pre className="text-sm">
          {JSON.stringify(context, null, 2) || "Undefined"}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
