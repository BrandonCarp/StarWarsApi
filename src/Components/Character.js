import React from "react";

const Character = ({ name, birthYear, height, mass, homeWorld, species }) => {
  return (
    <>
      <div className="relative mx-auto  container mb-5 ">
        <div className="flex  flex-col h-full justify-center  items-center bg-starYellow text-black rounded py-3 ">
          <h1 className="font-bold mb-1">{name}</h1>
          <ul className="flex flex-row flex-wrap px-8">
            <li className="flex flex-row justify-between gap-4 w-full">
              <span className="font-bold">Birth Year:</span>
              <span>{birthYear}</span>
            </li>
            <li className="flex flex-row justify-between gap-4 w-full" ><span className="font-bold">Species:</span>
              <span>{species}</span>
            </li>
            <li className="flex flex-row justify-between gap-4 w-full" >
              <span className="font-bold">Height:</span>
              <span>{height}</span>
            </li>
            <li className="flex flex-row justify-between gap-4 w-full">
              <span className="font-bold">Mass:</span>
              <span>{mass}</span>
            </li>
            <li className="flex flex-row justify-between gap-4 w-full">
              <span className="font-bold">Home World:</span>
              <span>{homeWorld}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Character;
