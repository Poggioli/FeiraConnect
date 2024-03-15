import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CitySlugLoading: FC = () => {

  return (
    <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 items-start max-w-screen-lg m-auto">
      <Skeleton className="h-10 w-40" />
    </div>
  );
};
