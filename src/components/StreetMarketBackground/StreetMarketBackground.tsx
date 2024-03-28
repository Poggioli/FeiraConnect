import { FC } from "react";
import PeopleFloatingWithDog from '@/assets/people-floating-with-dog.svg?react'
import PeopleIceCream from '@/assets/people-ice-cream.svg?react'
import PeoplePlaying from '@/assets/people-playing.svg?react'
import PeopleRunningPeopleSitting from '@/assets/people-running-people-sitting.svg?react'

export const StreetMarketBackground: FC = () => {

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex flex-col gap-4 p-4">
      <div className="flex flex-row flex-wrap justify-center md:justify-between items-center gap-4">
        <PeopleFloatingWithDog className="opacity-20 h-fit w-full max-w-[300px] sm:max-w-[400px]" />
        <PeopleIceCream className="opacity-20 h-fit w-full max-w-[300px] sm:max-w-[400px]" />
      </div>
      <div className="flex flex-row flex-wrap justify-center md:justify-between items-center gap-4">
        <PeoplePlaying className="opacity-20 h-fit w-full max-w-[300px] sm:max-w-[400px]" />
        <PeopleRunningPeopleSitting className="opacity-20 h-fit w-full max-w-[300px] sm:max-w-[400px]" />
      </div>
    </div>
  );
};
