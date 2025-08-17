import { cn } from "@/lib/utils";
import { Insight } from "@/types/insight";
import { ClassValue } from "clsx";

export function InsightCard(props: {
  insight: Insight;
  className?: ClassValue;
}) {
  return (
    <div
      className={cn(
        "w-full bg-card flex flex-row gap-2 border rounded-2xl shadow p-4",
        props.className
      )}
    >
      <p className="text-xl">{props.insight.emoji}</p>
      <p className="text-sm">{props.insight.title}</p>
    </div>
  );
}
