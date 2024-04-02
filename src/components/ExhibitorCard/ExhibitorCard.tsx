import WhatsApp from "@/assets/whatsapp-icon.svg?react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Earth, Phone } from "lucide-react";
import { FC, HTMLAttributes, forwardRef } from "react";
import { ExhibitorCardProps } from "./types";
import { useExhibitorCard } from "./useExhibitorCard";
import { Skeleton } from "@/components/ui/skeleton";

export const ExhibitorCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & ExhibitorCardProps
>(({ name, description, phone, whatsApp, website, items, ...props }, ref) => {
  const {
    formatedName,
    telephone,
    whatsAppNumber,
    hasWhatsApp
  } = useExhibitorCard({ name, phone, whatsApp });

  return (
    <Card {...props} className={cn("py-4 px-5 w-full flex flex-col", props.className)} ref={ref}>
      <CardTitle>{formatedName}</CardTitle>
      {description ? <CardDescription>{description}</CardDescription> : null}
      <div className="flex flex-col justify-between flex-1">
        <div className="mt-2 flex flex-row justify-start items-center flex-wrap gap-1">
          {items.map((item) => (
            <Badge variant="outline" key={item}>
              {item}
            </Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-row justify-end items-start flex-wrap gap-3">
          <a
            href={telephone.link}
            target="_blank"
            className="leading-[initial]"
            aria-label={telephone["aria-label"]}
          >
            <Badge variant="secondary" className="gap-2">
              <Phone className="h-3 w-3" />
              {telephone.formatedNumber}
            </Badge>
          </a>
          {hasWhatsApp ? (
            <a
              href={whatsAppNumber.link}
              target="_blank"
              className="leading-[initial]"
              aria-label={whatsAppNumber["aria-label"]}
            >
              <Badge variant="secondary" className="gap-2">
                <WhatsApp className="h-3 w-3 fill-current" />
                {whatsAppNumber.formatedNumber}
              </Badge>
            </a>
          ) : null}
          {website ? (
            <a href={website} target="_blank" className="leading-[initial]">
              <Badge variant="secondary" className="gap-2">
                <Earth className="h-3 w-3" />
                Site
              </Badge>
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
});

export const ExhibitorCardSkeleton: FC = () => (
  <Card className="py-4 px-5 w-full flex flex-col">
    <div className="flex flex-col justify-center items-start gap-1">
      <Skeleton className="rounded-sm h-4 w-36" />
      <Skeleton className="rounded-sm h-[0.875rem] w-full" />
    </div>
    <div className="flex flex-col justify-between flex-1">
      <div className="mt-2 flex flex-row justify-start items-center flex-wrap gap-1">
        {Array.from(Array(5).keys()).map((i) => <Skeleton key={i} className="rounded-sm h-4 w-24" />)}
      </div>
      <div className="mt-6 flex flex-row justify-end items-start flex-wrap gap-3">
        <Skeleton className="rounded-sm h-4 w-36" />
        <Skeleton className="rounded-sm h-4 w-36" />
        <Skeleton className="rounded-sm h-4 w-16" />
      </div>
    </div>
  </Card>
)