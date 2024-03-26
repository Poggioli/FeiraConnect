import PeopleMeditating from "@/assets/meditating.svg?react";
import { FC } from "react";

export const PageNotFound: FC = () => {

  return (
    <div className="p-6 md:p-12 min-h-full w-full flex flex-col justify-center items-center max-w-screen-lg m-auto">
      <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="h-full w-full flex flex-col gap-4 justify-center items-start max-w-screen-lg m-auto">
          <h1 className="text-xl tracking-tight">
            <strong>404.</strong>{" "}
            <span className="text-muted-foreground">Ocorreu um erro</span>
          </h1>
          <p className="leading-7">Você esta tentando acessar algo que não encontramos no nosso servidor.{" "}
            <span className="text-muted-foreground">
              Isso é tudo o que sabemos.
            </span>
          </p>
        </div>
        <PeopleMeditating className="w-full h-fit max-w-96" />
      </div>
    </div>
  );
};
