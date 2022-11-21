import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import SearchBar from "./Components/SearchBar";
import loadingGif from "./Components/loading.gif"
import { ThemeBtn } from "./Components/ThemeBtn";

import { useQuery } from "@tanstack/react-query";

const Default_Species = "Human";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://swapi.dev/api/people/?page=1"
  );
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  

  const { isLoading, data: character } = useQuery([`fetch-characters`, currentPage], () =>
    fetchCharacters(currentPage)
  );


  const fetchCharacters = (currentPage) => {
   const characters = fetchPeople(currentPage).then((people) =>
      Promise.all(people.map(fetchAuxilaryDataForPerson))
    );
    return characters;
  };

  const fetchPeople = async (currentPage) => {
    const { data } = await axios.get(currentPage);
  
   
    
    return data.results;
  };

  const nextPage = (page) => {
   
    if (page === null || undefined) {
    } else {
      setCurrentPage(page);
    }
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
      <button
            style={{
              color: "black",
              background: "yellow",
              borderRadius: "10px",
              padding: "10px",
              
              
            }}
            onClick={() => nextPage(next)}
          >
            Next
          </button>
          <button
            style={{
              color: "black",
              background: "yellow",
              borderRadius: "10px",
              padding: "10px",
              
              
            }}
            onClick={() => nextPage(previous)}
          >
            Prev
          </button>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-5 text-6xl font-bold text-starYellow lg:text-8xl">
          StarWars
        </h1>
        <SearchBar />
        
        <div>{isLoading ? <h1>Going into lightspeed...</h1> : <CharacterList characters={character} />}</div>
        <div className="flex flex-col-reverse mt-5  md:flex-row md:space-x-10  ">
          <button
            className="bg-starYellow text-spaceBlack font-bold px-4 py-2 rounded-full baseline hover:bg-spaceBlack hover:text-starYellow"
            onClick={() => nextPage(previous)}
          >
            Previous Page
          </button>
         
          <button
            className="bg-starYellow text-spaceBlack font-bold px-4 py-2 rounded-full baseline mb-5 md:mb-0 hover:bg-spaceBlack hover:text-starYellow"
            onClick={() => nextPage(next)}
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
