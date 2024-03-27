import { FC } from "react";
import PeopleLookingAtNothing from '@/assets/people-looking-at-nothing.svg?react';

export const EmptyResponse: FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8 text-center">
      <PeopleLookingAtNothing className="w-full max-w-64 h-fit" />
      <p className="scroll-m-20 text-xl tracking-tight">Não encontramos nada por aqui...</p>
    </div>
  );
};
