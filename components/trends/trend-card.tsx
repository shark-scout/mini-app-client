import { addressToShortString } from "@/lib/converters";
import { Trend } from "@/types/trend";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export function TrendCard(props: { trend: Trend }) {
  return (
    <div className="w-full bg-background flex flex-row gap-4 border rounded-2xl p-4">
      {/* Left part */}
      <Avatar className="size-16">
        <AvatarImage src={props.trend.token.logo || ""} />
        <AvatarFallback>
          {props.trend.token.symbol.slice(0, 3).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {/* Right part */}
      <div className="flex-1 flex flex-col items-start">
        {/* Token symbol */}
        <h4 className="text-xl font-semibold tracking-tight mt-1">
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
        {/* Users */}
        <div className="flex flex-row items-center gap-3">
          {/* User avatars */}
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            {props.trend.users.slice(0, 3).map((user) => (
              <Avatar key={user.fid}>
                <AvatarImage src={user.pfp_url} alt={`@${user.username}`} />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {/* User names */}
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
          <div className="bg-secondary flex flex-col items-center gap-1 px-3 py-2 border rounded-xl">
            <p className="text-sm">Transactions</p>
            <p className="text-xl font-bold">
              {props.trend.transactions.length}
            </p>
          </div>
          {props.trend.volume && (
            <div className="bg-secondary flex flex-col items-center gap-1 px-3 py-2 border rounded-xl">
              <p className="text-sm">Volume</p>
              <p className="text-xl font-bold">
                $
                {props.trend.volume.usd.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
