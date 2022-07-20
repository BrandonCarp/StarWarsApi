import React from 'react'
import Character from './Character'

const CharacterList = ({ characters }) => {
  return (
    <div>
      {characters.map((character) => <Character
        name={character.name}
        birthYear={character.birth_year}
        height={character.height}
        mass={character.mass}
        homeWorldName={character.homeWorldName}
        species={character.species}
        key={character.name} />
      )}
    </div>
  )
}

export default CharacterList