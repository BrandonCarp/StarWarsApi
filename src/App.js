import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import Header from "./Components/Header";
// import SearchBar from "./Components/SearchBar";
// import swloading from './Components/swloading.gif';


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [homeWorld, setHomeWorld] = useState([]);
  const [species, setSpecies] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("https://swapi.dev/api/people/");
  const [backPageUrl, setBackPageUrl] = useState('');
 

  const fetchPeople = async () => {
    const { data } = await axios.get(nextPageUrl);
    setCharacters(data.results);
    setNextPageUrl(data.next);
    setBackPageUrl(data.previous);
    return data.results;
  }

  const backPage = async () => {
      const { data } = await axios.get(backPageUrl);
      setCharacters(data.results);
      setNextPageUrl(data.next);
      setBackPageUrl(data.previous);
  }

  // const getThings = async () => {
  //   const {data} = await axios.get(nextPageUrl);
  //   return data.results;
  // }


  useEffect(() => {
    async function getSwapi() {
      const persons = await fetchPeople();

      const homeWorldUrl = await Promise.all(
        persons.map((thing) => axios.get(thing.homeworld)),
      );
      const homeWorldNames = homeWorldUrl.map(
        (names) => names.data.name
      );

     
     const newPersons =  persons.map((person) => {
      return {
        ...person,
        homeworld: axios.get(person.homeworld),
      };
     });
     setHomeWorld(newPersons);
    }
     getSwapi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


// config.url

  // const newPersons = persons.map((person) => {
  //   return {
  //     ...person,
  //     homeworldData: speciesUrl.find((url) => url.url === person.homeworld),
  //   };
  // });
  
  // species[2].data.name
  
  return (
    <div>
     {/* <Header /> */}
      <CharacterList homeWorld={homeWorld} list={characters}/>
     <h4>Real Buttons Below</h4>
     <button onClick={(e) => backPage()}>Back Page</button>
     <button onClick={(e) => fetchPeople()}>Next Page</button>
     <h3>Test Button</h3>
     <button onClick={(e) => console.log(homeWorld)}>Test</button>
    </div>
  );
}

export default App;
