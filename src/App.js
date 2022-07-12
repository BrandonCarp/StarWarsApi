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
  const [worldUrl, setWorldUrl] = useState([]);
  const [speciesUrl, setSpeciesUrl] = useState([]);

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

  const getThings = async () => {
    const {data} = await axios.get(nextPageUrl);
    return data.results;
  }

  // const getSpecificUrl = async (url) => {
  //   const {data} = await axios.get(url);
  //   console.log(data);
  //   return data;
  // }

 

  // useEffect(() => {
  //   async function getSwapi() {
  //     const things = await getThings();
  //     const specificUrl = await Promise.all([
  //       things.map(thing => axios.get(thing.homeworld)
  //       )
  //     ]);
  //       setHomeWorld(Promise.resolve(specificUrl));
  //   }
  //    getSwapi();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  
  useEffect(() => {
    async function getSwapi() {
      const things = await fetchPeople();
      const specificUrl = await Promise.all(
        things.map((thing) => axios.get(thing.homeworld))
      );
      setHomeWorld(specificUrl);
    }
     getSwapi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  

 
 
  return (
    <div>
     {/* <Header /> */}
      <CharacterList  list={characters}/>
     <h4>Real Buttons Below</h4>
     <button onClick={(e) => backPage()}>Back Page</button>
     <button onClick={(e) => fetchPeople()}>Next Page</button>
     <h3>Test Button</h3>
     <button onClick={(e) => console.log(characters)}>Test</button>
    </div>
  );
}

export default App;
