import React, {useState} from 'react'
import Character from './Character'


const CharacterList = (props) => {

  // const fetchWorld = async () => {
  //   const { data } = await axios.get(props.homeWorld);
  //   setHomeWorld(data.name);
  // };
 
  return (
    <div> 
      {props.list.map((data) => <Character   name={data.name} birthYear={data.birth_year} height={data.height} mass={data.mass} homeWorld={data.homeworld} species={data.species} key={data.name} />
      )}

      {/* {loading ? <img src={swloading} alt='loading'/> : {characterScreen}} */}
      {/* {characterScreen} */}
    </div>
  )
}

export default CharacterList