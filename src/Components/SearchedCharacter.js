import React from "react";

const SearchedCharacter = ({ foundPerson }) => {
  return (
    <div>
      {foundPerson.name ? (
        <table className="mb-2">
          <thead className="">
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
              <td className="">{foundPerson.name}</td>
              <td className="pl-4 md:pl-4">{foundPerson.birth_year}</td>
              <td className="pl-3 md:pl-5">{foundPerson.height}</td>
              <td className="md:pl-6">{foundPerson.mass}</td>
              <td className="pl-4 md:pl-8">{foundPerson.homeWorldName}</td>
              <td className="md:pl-4">{foundPerson.species}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default SearchedCharacter;
