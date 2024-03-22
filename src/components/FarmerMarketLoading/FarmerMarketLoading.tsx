import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const FarmerMarketLoading: FC = () => {
  return (
    <div className="p-6 md:p-12 min-h-full w-full flex flex-col gap-4 items-start max-w-screen-xlg m-auto">
      <Skeleton className="min-h-10 w-40" />
    </div>
  );
};
