"use client";

import { useMiniApp } from "@neynar/react";
import { posthog } from "posthog-js";
import { useEffect } from "react";

// TODO: Integrate and use this component
export function Identifier() {
  const { isSDKLoaded, context } = useMiniApp();

  useEffect(() => {
    const fid = context?.user.fid;
    if (isSDKLoaded && fid) {
      // Identify the user (creates/updates user profile)
      posthog.identify(fid.toString(), { fid: fid });

      // Register as super property (includes in all events)
      posthog.register({ fid: fid });
    }
  }, [isSDKLoaded, context?.user.fid]);

  return <></>;
}
