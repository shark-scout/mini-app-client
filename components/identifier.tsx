"use client";

import { useMiniApp } from "@neynar/react";
import { posthog } from "posthog-js";
import { useEffect } from "react";

export function Identifier() {
  const { context } = useMiniApp();

  useEffect(() => {
    const fid = context?.user.fid;
    if (fid) {
      // Identify the user (creates/updates user profile)
      posthog.identify(fid.toString(), { fid: fid });

      // Register as super property (includes in all events)
      posthog.register({ fid: fid });
    }
  }, [context?.user.fid]);

  return <></>;
}
