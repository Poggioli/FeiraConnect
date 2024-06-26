import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { FC, HTMLAttributes, forwardRef } from "react";
import { StreetMarketCardProps } from "./types";
import { useStreetMarketCard } from "./useStreetMarketCard";

export const StreetMarketCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & StreetMarketCardProps
>(({
  name,
  neighborhood,
  apperture,
  closure,
  weekday,
  slug,
  className,
  ...props
}, ref) => {
  const {
    formatedName,
    formatedNeighborhood,
    timeFormated,
    weekdayFormated
  } = useStreetMarketCard({
    apperture,
    closure,
    name,
    neighborhood,
    weekday,
  });

  return (
    <Link
      from="/city/$city"
      to="/city/$city/$streetMarket"
      params={{
        streetMarket: slug
      }}
    >
      <Card {...props} className={cn("py-4 px-5 w-full", className)} ref={ref}>
        <CardTitle>{formatedName}</CardTitle>
        <CardDescription>{formatedNeighborhood}</CardDescription>
        <div className="mt-2 flex flex-row flex-wrap gap-2">
          <Badge variant="outline">{weekdayFormated}</Badge>
          <Badge variant="outline">{timeFormated}</Badge>
        </div>
      </Card>
    </Link>
  );
});

export const StreetMarketCardSkeleton: FC = () => (
  <Card className="py-4 px-5 w-full">
    <div className="flex flex-col justify-center items-start gap-1">
      <Skeleton className="rounded-sm h-4 w-36" />
      <Skeleton className="rounded-sm h-[0.875rem] w-14" />
    </div>
    <div className="mt-2 flex flex-row flex-wrap gap-2">
      <Skeleton className="rounded-sm h-4 w-28" />
      <Skeleton className="rounded-sm h-4 w-20" />
    </div>
  </Card>
)
