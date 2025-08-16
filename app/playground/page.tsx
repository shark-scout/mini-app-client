"use client";

import { useMiniApp } from "@neynar/react";

export default function PlaygroundPage() {
  const { isSDKLoaded, context } = useMiniApp();

  console.log("Context:", context);

  return (
    <div>
      {isSDKLoaded ? (
        <p>Context: {JSON.stringify(context, null, 2)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
