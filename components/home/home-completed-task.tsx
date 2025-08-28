import { taskBalancesUsdValueToDisplayData } from "@/lib/converters";
import { Task } from "@/types/task";
import Image from "next/image";

export function HomeCompletedTask(props: { task: Task }) {
  const diplayData = taskBalancesUsdValueToDisplayData(
    props.task.result!.balancesUsdValue
  );

  return (
    <div className="flex flex-col items-center">
      <Image
        src={diplayData.image}
        alt="Cover"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-xl"
      />
      <h1 className="text-2xl font-bold">It&apos;s unbelievable!</h1>
      <p className="text-center mt-2">
        You and your followers collectively own...
      </p>
    </div>
  );
}
