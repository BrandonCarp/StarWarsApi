import React, {useState, useEffect} from 'react'
import axios from "axios";
import Character from './Character'


const CharacterList = (props) => {

  // const [homeWorld, setHomeWorld] = useState('');

  // const fetchWorld = async (value) => {
  //   const { data } = await axios.get(value);
  //   setHomeWorld(data.name);
  // };

  // useEffect(() => {
  //  fetchWorld();
  // }, []);
 
 
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