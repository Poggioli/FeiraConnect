import PeopleLookingAtNothing from '@/assets/people-looking-at-nothing.svg?react';
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export const EmptyResponse = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {

  return (
    <div ref={ref} {...props} className={cn("w-full flex flex-col justify-center items-center gap-8 text-center", className)}>
      <PeopleLookingAtNothing className="w-full max-w-64 h-fit opacity-40" />
      <p className="scroll-m-20 text-xl tracking-tight">{children ? children : "Não encontramos nada por aqui..."}</p>
    </div >
  );
})