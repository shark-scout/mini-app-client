"use client";

import { posthogConfig } from "@/config/posthog";
import { useMiniApp } from "@neynar/react";
import { posthog } from "posthog-js";
import { useEffect } from "react";

export function Identifier() {
  const { context } = useMiniApp();

  useEffect(() => {
    const fid = context?.user.fid;
    const clientFid = context?.client.clientFid;
    if (fid && clientFid) {
      // Identify the user (creates/updates user profile)
      posthog.identify(fid.toString(), {
        [posthogConfig.properties.fid]: fid,
        [posthogConfig.properties.clientFid]: clientFid,
      });

      // Register as super property (includes in all events)
      posthog.register({
        [posthogConfig.properties.fid]: fid,
        [posthogConfig.properties.clientFid]: clientFid,
      });
    }
  }, [context?.user.fid, context?.client.clientFid]);

  return <></>;
}
