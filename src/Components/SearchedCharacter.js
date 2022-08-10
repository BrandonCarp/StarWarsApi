import React from "react";

const SearchedCharacter = ({ foundPerson }) => {
  return (
    <div>
      <table className="mb-2">
        <thead>
          <tr className="">
            <th className="pr-3">Name</th>
            <th className="pr-3">Birth Year</th>
            <th>Height</th>
            <th className="pl-3">Mass</th>
            <th className="pl-3">Home World</th>
            <th className="pl-3">Species</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="">{foundPerson.name}</td>
            <td className="pl-3">{foundPerson.birth_year}</td>
            <td className="pl-3">{foundPerson.height}</td>
            <td className="pl-5">{foundPerson.mass}</td>
            <td className="pl-7">{foundPerson.homeWorldName}</td>
            <td className="pl-4">{foundPerson.species}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchedCharacter;
