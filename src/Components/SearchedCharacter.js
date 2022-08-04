import React from "react";

const SearchedCharacter = ({ foundPerson }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Birth Year</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Home World</th>
          <th>Species</th>
        </tr>
        <tr>
          <th>{foundPerson.name}</th>
          <th>{foundPerson.birth_year}</th>
          <th>{foundPerson.height}</th>
          <th>{foundPerson.mass}</th>
          <th>{foundPerson.homeWorldName}</th>
          <th>{foundPerson.species}</th>
        </tr>
      </tbody>
    </table>
  );
};

export default SearchedCharacter;
