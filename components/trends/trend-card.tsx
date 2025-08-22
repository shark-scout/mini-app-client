import { Trend } from "@/types/trend";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function TrendCard(props: { trend: Trend }) {
  if (["USDT", "USDC", "ETH", "USDbC"].includes(props.trend.token.symbol)) {
    return undefined;
  }
  if (Number(props.trend.value) <= 0) {
    return undefined;
  }

  return (
    <div className="w-full bg-card flex flex-row gap-4 border rounded-2xl shadow p-6">
      {/* Left part */}
      <Avatar className="size-8 ring-2 ring-primary">
        <AvatarImage src={props.trend.token.icon || ""} />
        <AvatarFallback className="text-xs">
          {props.trend.token.symbol.slice(0, 3).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {/* Right part */}
      <div className="flex-1 flex flex-col items-start">
        {/* Token symbol */}
        <h4 className="text-xl font-semibold tracking-tigh">
          {props.trend.token.symbol.length > 15
            ? props.trend.token.symbol.slice(0, 15) + "..."
            : props.trend.token.symbol}
        </h4>
        {/* Indicators */}
        <p className="text-sm mt-1">
          {Number(props.trend.value) > 0
            ? "$" +
              props.trend.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "N/A"}{" "}
          value · {props.trend.transactions.length} transactions
        </p>
        <div className="flex flex-row items-center gap-2 mt-2">
          {/* User avatars */}
          <div className="*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background flex -space-x-2">
            {props.trend.users.slice(0, 3).map((user) => (
              <Avatar key={user.fid} className="size-6">
                <AvatarImage src={user.pfp_url} alt={`@${user.username}`} />
                <AvatarFallback>
                  {user.username.slice(0, 3).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {/* User names */}
          <p className="text-sm">
            <span className="font-semibold">
              {props.trend.users[0]?.username}
              {props.trend.users.length > 1 &&
                ` and ${props.trend.users.length - 1} ${
                  props.trend.type === "buy" ? "buyers" : "sellers"
                }`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
