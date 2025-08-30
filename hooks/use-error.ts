import { posthogConfig } from "@/config/posthog";
import { errorToString } from "@/lib/converters";
import posthog from "posthog-js";
import { toast } from "sonner";

export default function useError() {
  const handleError = async (
    error: unknown,
    message?: string,
    disableToast?: boolean
  ) => {
    // Print error
    console.error(errorToString(error));
    // Log error in PostHog
    posthog.capture(posthogConfig.events.error, {
      [posthogConfig.properties.message]: message,
      [posthogConfig.properties.error]: errorToString(error),
      [posthogConfig.properties.stack]:
        error instanceof Error ? error.stack : undefined,
    });
    // Display toast
    if (!disableToast) {
      toast.error("Something went wrong :(", {
        description: message || errorToString(error),
      });
    }
  };

  return {
    handleError,
  };
}
