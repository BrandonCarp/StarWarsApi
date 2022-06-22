import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";



const App = () => {
  const [characters, setCharacters] = useState([]);
  const [home, setHome] = useState([]);
  const [species, setSpecies] = useState([]);



  const fetchPeople = () => {
    const personApi = 'https://swapi.dev/api/people/';
    const planetApi = 'https://swapi.dev/api/planets/';

    const getPersonApi = axios.get(personApi);
    const getPlanetApi = axios.get(planetApi);
    axios.all([getPersonApi, getPlanetApi]).then(
      axios.spread((...allData) => {
        const allPeople = allData[0]
        const allPlanets = allData[1]
        setCharacters(allPeople);
        setHome(allPlanets);
      })
    )
  }

  useEffect(() => {
   fetchPeople();
  }, []);


  // const fetchData = () => {
  //  const personApi = 'https://swapi.dev/api/people/';
  //  const planetApi = 'https://swapi.dev/api/planets/';

  //  const getPerson = axios.get(personApi);
  //  const getPlanet = axios.get(planetApi);
  //  axios.all([])
  // }



 


  return (
    <div>
     <Header />
     <SearchBar />
     {/* <CharacterList list={characters}/> */}
     <button onClick={(e) => console.log(characters, home)}>Click</button>
    </div>
  );
}

export default App;
