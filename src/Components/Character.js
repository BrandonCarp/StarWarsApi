import React from "react";

const Character = ({ name, birthYear, height, mass, homeWorld, species }) => {
  return (
    <>
    
      <div className="relative mx-auto container  mb-5 w-[80%]">
          <div className="flex  flex-col  justify-center  items-center bg-starYellow text-black rounded py-3 px-10">
          <h1 className="font-bold">{name}</h1>
<div className="">
  <ul className="flex">
    <li className="flex flex-col items-center"> <p className="font-bold">Birth Year</p> <p>{birthYear}</p></li>
    <li className="px-4 font-bold">{species}</li>
    <li className="flex flex-col items-center"><p className="font-bold">Height</p> <p>{height}</p></li>
  </ul>
  <ul className="flex justify-center ">
    <li className="flex flex-col items-center"><p className="font-bold">Mass</p> <p>{mass}</p></li>
    <li className="pl-4 flex flex-col items-center"><p className="font-bold">Home World</p> <p>{homeWorld}</p></li>
  </ul>
          </div>
</div>
        </div>
    </>
  );
};

export default Character;
