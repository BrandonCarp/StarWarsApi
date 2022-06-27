import React, {useState} from 'react'
import Character from './Character'
import swloading from './swloading.gif';

const CharacterList = (props) => {

  const [loading, setLoading] = useState(true);


  const loadingScreen = (data) => {
      if(data ===  false) {
        setLoading(false);
      } else {
        setLoading(true);
      }
  }

// {loading ? <img src={swloading} alt='loading'/> : <CharacterList loadingScreen={loadingScreen()} list={characters}/>}

let characterScreen = props.list.map((data) => <Character loadingFunc={loadingScreen} name={data.name} birthYear={data.birth_year} height={data.height} mass={data.mass} homeWorld={data.homeworld} species={data.species} key={data.name} />
);



  return (
    <div>
      {/* {props.list.map((data) => <Character loadingFunc={loadingScreen} name={data.name} birthYear={data.birth_year} height={data.height} mass={data.mass} homeWorld={data.homeworld} species={data.species} key={data.name} />
      )} */}
      {loading ? <img src={swloading} alt='loading'/> : {characterScreen}}
      {/* {characterScreen} */}
    </div>
  )
}

export default CharacterList