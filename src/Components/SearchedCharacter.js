import React from "react";

const SearchedCharacter = ({ foundPerson }) => {
  return (
    <div className="my-10 w-[80%] mx-auto">
      {foundPerson.name ? (
         <div className="relative mx-auto container mb-5 ">
         <div className="flex  flex-col  justify-center  items-center bg-starYellow text-black rounded py-3 px-5">
         <h1 className="font-bold">{foundPerson.name}</h1>
<div className="">
 <ul className="flex">
   <li className="flex flex-col items-center"> <p className="font-bold">Birth Year</p> <p>{foundPerson.birth_year}</p></li>
   <li className="px-4 font-bold">{foundPerson.species}</li>
   <li className="flex flex-col items-center"><p className="font-bold">Height</p> <p>{foundPerson.height}</p></li>
 </ul>
 <ul className="flex justify-center ">
   <li className="flex flex-col items-center"><p className="font-bold">Mass</p> <p>{foundPerson.mass}</p></li>
   <li className="pl-4 flex flex-col items-center"><p className="font-bold">Home World</p> <p>{foundPerson.homeWorldName}</p></li>
 </ul>
         </div>
</div>
       </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default SearchedCharacter;
