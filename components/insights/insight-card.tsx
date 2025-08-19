import { userHasAccess } from "@/lib/access";
import { cn } from "@/lib/utils";
import { Insight } from "@/types/insight";
import { ClassValue } from "clsx";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function InsightCard(props: {
  insight: Insight;
  fid?: number;
  className?: ClassValue;
}) {
  return (
    <div
      className={cn(
        "w-full bg-card flex flex-row gap-2 border rounded-2xl shadow p-4",
        props.className
      )}
    >
      {/* Left part */}
      <p className="text-xl">{props.insight.emoji}</p>
      {/* Right part */}
      <div className="flex-1 flex flex-col items-start">
        {/* Title */}
        <p className="text-sm">{props.insight.title}</p>
        {/* Actions */}
        {!userHasAccess(props.fid) && (
          <div className="flex flex-row gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={() => toast.info("Available to beta users only")}
              className="text-secondary-foreground"
            >
              ↗️ Share
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
