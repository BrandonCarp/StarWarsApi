import React from "react";
import Character from "./Character";

const CharacterList = ({ characters }) => {
  return (
    <>
      {characters.map((character) => (
        <Character
          name={character.name}
          birthYear={character.birth_year}
          height={character.height}
          mass={character.mass}
          homeWorld={character.homeWorldName}
          species={character.species}
          key={character.name}
        />
      ))}
    </>
  );
};

export default CharacterList;
