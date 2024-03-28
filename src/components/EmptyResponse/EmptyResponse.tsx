import PeopleLookingAtNothing from '@/assets/people-looking-at-nothing.svg?react';
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export const EmptyResponse = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {

  return (
    <div ref={ref} {...props} className={cn("w-full flex flex-col justify-center items-center gap-8 text-center", className)}>
      <PeopleLookingAtNothing className="w-full max-w-64 h-fit" />
      <p className="scroll-m-20 text-xl tracking-tight">Não encontramos nada por aqui...</p>
    </div >
  );
})