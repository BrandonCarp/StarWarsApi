import React from "react";

const Character = ({ name, birthYear, height, mass, homeWorld, species }) => {
  return (
    // <table>
    //   <tbody>
    //     <tr className="">
    //       <th>Name</th>
    //       <th>Birth Year</th>
    //       <th>Height</th>
    //       <th>Mass</th>
    //       <th>Home World</th>
    //       <th>Species</th>
    //     </tr>
    //     <tr>
    //       <th>{name}</th>
    //       <th>{birthYear}</th>
    //       <th>{height}</th>
    //       <th>{mass}</th>
    //       <th>{homeWorld}</th>
    //       <th>{species}</th>
    //     </tr>
    //   </tbody>
    // </table>
    <div>
      <table className="mb-2">
        <thead>
          <tr className="">
            <th className="pr-5 md:pr-3">Name</th>
            <th className="pl-1 md:pr-3">Birth Year</th>
            <th className="pl-1 ">Height</th>
            <th className="pl-1 md:pl-3">Mass</th>
            <th className="pl-1 md:pl-3">Home World</th>
            <th className="pl-1 md:pl-3">Species</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-starYellow">
            <td className="">{name}</td>
            <td className="pl-4 md:pl-4">{birthYear}</td>
            <td className="pl-3 md:pl-5">{height}</td>
            <td className="md:pl-6">{mass}</td>
            <td className="pl-4 md:pl-8">{homeWorld}</td>
            <td className="md:pl-4">{species}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Character;
