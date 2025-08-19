import { addressToShortString } from "@/lib/converters";
import { Trend } from "@/types/trend";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { userHasAccess } from "@/lib/access";

export function TrendCard(props: { trend: Trend; fid?: number }) {
  return (
    <div className="w-full bg-card flex flex-row gap-4 border rounded-2xl shadow p-6">
      {/* Left part */}
      <Avatar className="size-8 ring-2 ring-primary">
        <AvatarImage src={props.trend.token.logo || ""} />
        <AvatarFallback>
          {props.trend.token.symbol.slice(0, 3).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {/* Right part */}
      <div className="flex-1 flex flex-col items-start">
        {/* Token symbol */}
        <h4 className="text-xl font-semibold tracking-tigh">
          {props.trend.token.symbol}
        </h4>
        {/* Token address */}
        <Link
          href={`https://basescan.org/token/${props.trend.token.address}`}
          target="_blank"
        >
          <p className="text-sm text-primary">
            {addressToShortString(props.trend.token.address)} · Base
          </p>
        </Link>
        <Separator className="my-4" />
        {/* User avatars */}
        <div className="*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background flex -space-x-2">
          {props.trend.users.slice(0, 5).map((user) => (
            <Avatar key={user.fid}>
              <AvatarImage src={user.pfp_url} alt={`@${user.username}`} />
              <AvatarFallback>
                {user.username.slice(0, 3).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        {/* User names */}
        <div className="mt-2">
          <p className="text-sm">
            Bought by{" "}
            <span className="font-semibold">
              {props.trend.users[0]?.username}
              {props.trend.users.length > 1 &&
                ` and ${props.trend.users.length - 1} others`}
            </span>
          </p>
        </div>
        {/* Indicators */}
        <div className="flex flex-row gap-4 mt-4">
          {props.trend.volume && (
            <div className="bg-primary text-primary-foreground flex flex-col items-center px-3 py-2 rounded-xl">
              <p className="text-sm">Volume</p>
              <p className="text-lg font-bold">
                $
                {props.trend.volume.usd.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          )}
          <div className="bg-accent text-accent-foreground flex flex-col items-center px-3 py-2 rounded-xl">
            <p className="text-sm">Transactions</p>
            <p className="text-lg font-bold">
              {props.trend.transactions.length}
            </p>
          </div>
        </div>
        {/* Actions */}
        {!userHasAccess(props.fid) && (
          <>
            <Separator className="my-4" />
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => toast.info("Available to beta users only")}
              >
                ↗️ Share
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.info("Available to beta users only")}
              >
                👀 Details
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
