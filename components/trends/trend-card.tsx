import { addressToShortString } from "@/lib/converters";
import { Trend } from "@/types/trend";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export function TrendCard(props: { trend: Trend }) {
  return (
    <div className="w-full bg-background flex flex-row gap-4 border rounded-2xl p-4">
      {/* Left part */}
      <Avatar className="size-16">
        <AvatarImage src={props.trend.tokenLogo || ""} />
        <AvatarFallback>{props.trend.tokenSymbol}</AvatarFallback>
      </Avatar>
      {/* Right part */}
      <div className="flex-1 flex flex-col items-start">
        <h4 className="text-xl font-semibold tracking-tight mt-1">
          {props.trend.tokenSymbol}
        </h4>
        <p className="text-sm text-muted-foreground">
          {addressToShortString(props.trend.tokenAddress)}
        </p>
        <Separator className="my-4" />
        <div className="flex flex-row items-center gap-3">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-sm">
            Bought by {props.trend.userFids[0]} and{" "}
            {props.trend.userFids.length - 1} others
          </p>
        </div>
      </div>
    </div>
  );
}
