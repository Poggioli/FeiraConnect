import PeoplePaper from '@/assets/people-paper.svg?react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import { TryAgainProps } from "./types";

export const TryAgain = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & TryAgainProps
>(({ className, refetch, ...props }, ref) => {

  return (
    <div {...props} ref={ref} className={cn("w-full flex flex-col justify-center items-center gap-8 text-center", className)}>
      <PeoplePaper className="w-full max-w-96 h-fit" />
      <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
        <p className="scroll-m-20 text-xl tracking-tight">Ocorreu um erro ao obter os dados. Tente novamente mais tarde.</p>
        <Button variant="link" onClick={refetch} aria-label="Tentar novamente">Tentar novamente</Button>
      </div>
    </div>
  );
})