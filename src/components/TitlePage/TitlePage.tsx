import { FC, PropsWithChildren } from "react";

export const TitlePage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">{children}</h1>
  );
};
