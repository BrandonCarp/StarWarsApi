import { useState } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import SearchBar from "./Components/SearchBar";
import { ThemeBtn } from "./Components/ThemeBtn";

import { useQuery } from "@tanstack/react-query";

const Default_Species = "Human";

const App = () => {
 
  const [pageNumber, setPageNumber] = useState(1);
 

  

  const { isLoading, data: character } = useQuery([`fetch-characters`, pageNumber], () =>
    fetchCharacters(pageNumber)
  );


  const fetchCharacters = (pageNumber) => {
   const characters = fetchPeople(pageNumber).then((people) =>
      Promise.all(people.map(fetchAuxilaryDataForPerson))
    );
    return characters;
  };

  const fetchPeople = async (pageNumber) => {
    const { data } = await axios.get(`https://swapi.dev/api/people/?page=${pageNumber}`);
   
    return data.results;
  };


  const fetchAuxilaryDataForPerson = async (person) => {
    const [homeWorldName, species] = await Promise.all([
      axios.get(person.homeworld).then(({ data }) => data.name),
      person.species.length
        ? axios.get(person.species[0]).then(({ data }) => data.name)
        : Promise.resolve(Default_Species),
    ]);
    return {
      ...person,
      homeWorldName,
      species,
    };
  };

 

  return (
    <div className="relative mx-auto container">

    
    <div className=" text-white container flex flex-col items-center mx-auto  justify-center ">
      <ThemeBtn />
      
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-5 text-6xl font-bold text-starYellow lg:text-8xl">
          StarWars
        </h1>
        <SearchBar />
        
        <div>{isLoading ? <h1>Going into lightspeed...</h1> : <CharacterList characters={character} />}</div>
        <div className="flex flex-col-reverse mt-5  md:flex-row md:space-x-10  ">
        <button
            className="bg-starYellow text-spaceBlack font-bold px-4 py-2 rounded-full baseline hover:bg-spaceBlack hover:text-starYellow"
            onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}
          >
            Previous Page
          </button>
         
          <button
            className="bg-starYellow text-spaceBlack font-bold px-4 py-2 rounded-full baseline mb-5 md:mb-0 hover:bg-spaceBlack hover:text-starYellow"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === 9}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
