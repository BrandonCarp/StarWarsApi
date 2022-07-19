import React  from 'react'
import Character from './Character'


const CharacterList = (props) => {

  return (
    <div> 
       {props.list.map((data) => <Character   name={data.name} birthYear={data.birth_year} height={data.height} mass={data.mass} homeWorld={data.homeWorld} species={data.species} key={data.name} />
      )}
    </div>
  )
}

export default CharacterList