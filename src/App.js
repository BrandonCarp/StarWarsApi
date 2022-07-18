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
  // const [species, setSpecies] = useState([]);
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

//   // Get Species
  async function getSpecies() {
    // const persons = await fetchPeople();
    const speciesUrl = await Promise.all(
      // filter by length to get all with [0] together since all are arrays of [0]
      // map to create array of each one with an array of [0] 
      people
        .filter((thing) => thing.species.length)
        .map((thing) => axios.get(thing.species[0]))
    );


    const newSwapi = people.map((person) => {
      return {
        ...person,
        species: speciesUrl.find((info) => info.data.url === person.species[0])
      };
    });
    const newSwapi2 = newSwapi.map((person) => {
      if(person.species == undefined){
        return {...person, species: 'Human'}
      } else {
        return {...person, species: person.species.data.name}
      }
     });
setCharacters(newSwapi2); 
console.log(characters);
      // species.data.name
   setTest(newSwapi2);
}


 

  useEffect(() => {
   async function getCharacters() {
     await getPeople();
        getSpecies();
   }   
    //  getPeople(); 
    //  getSpecies();
     
getCharacters();
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
     <button onClick={(e) => console.log(test)}>Test</button>
    </div>
  );
}

export default App;
