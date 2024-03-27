import { FC } from "react";
import PeoplePaper from '@/assets/people-paper.svg?react';
import { TryAgainProps } from "./types";
import { Button } from "../ui/button";

export const TryAgain: FC<TryAgainProps> = ({ refetch }) => {

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8 text-center">
      <PeoplePaper className="w-full max-w-96 h-fit" />
      <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
        <p className="scroll-m-20 text-xl tracking-tight">Ocorreu um erro ao obter os dados. Tente novamente mais tarde.</p>
        <Button variant="link" onClick={refetch} aria-label="Tentar novamente">Tentar novamente</Button>
      </div>
    </div>
  );
};
