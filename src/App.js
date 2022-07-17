import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import Header from "./Components/Header";
// import SearchBar from "./Components/SearchBar";
// import swloading from './Components/swloading.gif';


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [people, setPeople] = useState([]);
  const [homeWorld, setHomeWorld] = useState([]);
  const [species, setSpecies] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("https://swapi.dev/api/people/");
  const [backPageUrl, setBackPageUrl] = useState('');
  const [test, setTest] = useState([]);
 

  const fetchPeople = async () => {
    const { data } = await axios.get(nextPageUrl);
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


  // Get People
  async function getPeople() {
    const persons = await fetchPeople();

    const homeWorldUrl= await Promise.all(
      persons.map((thing) => axios.get(thing.homeworld)),
    );

   const newPersons =  persons.map((person) => {
    return {
      ...person,
      homeworld: homeWorldUrl.find((url) => url.config.url === person.homeworld)
    };
   });

   const newPersons2 = newPersons.map((person) => {
    return {
      ...person,
      homeWorld: person.homeworld.data.name
    };
   });
   setPeople(newPersons2);
  }

  // Get Species
  async function getSpecies() {
    const persons = await fetchPeople();
    const speciesUrl = await Promise.all(
      persons
        .filter((thing) => thing.species.length)
        .map((thing) => axios.get(thing.species[0]))
    );
    const newSwapi = persons.map((person) => {
      return {
        ...person,
        species: speciesUrl.find((info) => info.data.url === person.species[0])
      };
    });

    const newSwapi2 = newSwapi.map((person) => {
      return {
        ...person,
        species:  person.species.data.name
      };
     });
      // species.data.name
   setTest(newSwapi);
}
 

  useEffect(() => {
    getSpecies();
     getPeople();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
     {/* <Header /> */}
      <CharacterList  list={people}/>
     <h4>Real Buttons Below</h4>
     <button onClick={(e) => backPage()}>Back Page</button>
     <button onClick={(e) => fetchPeople()}>Next Page</button>
     <h3>Test Button</h3>
     <button onClick={(e) => console.log(test[2].species.data.name)}>Test</button>
    </div>
  );
}

export default App;
