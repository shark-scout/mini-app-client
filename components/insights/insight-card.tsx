import { userHasAccess } from "@/lib/access";
import { Insight } from "@/types/insight";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export function InsightCard(props: {
  insight: Insight;
  fid: number | undefined;
}) {
  return (
    <div className="w-full bg-card flex flex-row gap-4 border rounded-2xl shadow p-6">
      {/* Left part */}
      <Avatar className="size-8">
        <AvatarFallback className="text-sm bg-accent">
          {props.insight.emoji}
        </AvatarFallback>
      </Avatar>
      {/* Right part */}
      <div className="flex-1 flex flex-col items-start">
        {/* Title */}
        <p className="text-sm">{props.insight.title}</p>
        {/* Actions */}
        {!userHasAccess(props.fid) && (
          <div className="flex flex-row gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Available to beta users only")}
            >
              ↗️ Share
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
