import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { FC } from "react";
import { FarmersMarketCardProps } from "./types";
import { useFarmersMarketCard } from "./useFarmersMarketCard";

export const FarmersMarketCard: FC<FarmersMarketCardProps> = ({ name, neighborhood, frequency, startTime, endTime }) => {

  const { weekDay, workHour } = useFarmersMarketCard({ frequency, startTime, endTime });

  return (
    <Link
      from="/city/$city"
      to="./$neighborhood"
      params={{ neighborhood: neighborhood.slug }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{neighborhood.name}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap gap-x-1 gap-y-2">
          <Badge variant="outline">{weekDay}</Badge>
          <Badge variant="outline">{workHour}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export const FarmersMarketCardLoading: FC = () => {
  return (
    <Card className="p-6">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-32 mt-2" />
      <div className="flex flex-row gap-x-1 mt-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
    </Card>
  )
}