import React from "react";

const Character = ({ name, birthYear, height, mass, homeWorld, species }) => {
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
          <th>{name}</th>
          <th>{birthYear}</th>
          <th>{height}</th>
          <th>{mass}</th>
          <th>{homeWorld}</th>
          <th>{species}</th>
        </tr>
      </tbody>
    </table>
  );
};

export default Character;
