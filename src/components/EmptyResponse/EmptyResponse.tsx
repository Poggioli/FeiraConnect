import PeopleLookingAtNothing from '@/assets/people-looking-at-nothing.svg?react';
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const EmptyResponseContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {

  return (
    <div ref={ref} {...props} className={cn("w-full flex flex-col justify-center items-center gap-8 text-center", className)} />
  );
})

const EmptyResponseImage = forwardRef<
  SVGSVGElement,
  HTMLAttributes<SVGSVGElement>
>(({ className, ...props }, ref) => {

  return (
    <PeopleLookingAtNothing ref={ref} {...props} className={cn("w-full max-w-64 h-fit opacity-40", className)} />
  );
})

const EmptyResponseMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {

  return (
    <p ref={ref} {...props} className={cn("scroll-m-20 text-xl tracking-tight", className)}>{children ? children : "Não encontramos nada por aqui..."}</p>
  );
})

export const EmptyResponse = {
  Container: EmptyResponseContainer,
  Image: EmptyResponseImage,
  Message: EmptyResponseMessage
}