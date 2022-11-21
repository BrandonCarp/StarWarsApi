import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import SearchBar from "./Components/SearchBar";
import loadingGif from "./Components/loading.gif";
import { ThemeBtn } from "./Components/ThemeBtn";

import { useQuery } from "@tanstack/react-query";

const Default_Species = "Human";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://swapi.dev/api/people/?page=1"
  );

  // Create individual functions that make fetch calls
  // Initial Call
  const { data: character } = useQuery([`fetch-characters`, currentPage], () =>
    fetchCharacters(currentPage)
  );

  const next = character?.data.next;
  const previous = character?.data.previous;

  const fetchCharacters = (currentPage) => {
    fetchPeople(currentPage).then((people) =>
      Promise.all(people.map(fetchAuxilaryDataForPerson))
    );
    return;
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

  // useEffect(() => {
  //   fetchPeople(currentPage)
  //     .then((people) => Promise.all(people.map(fetchAuxilaryDataForPerson)))
  //     .then(setCharacters);
  // }, [currentPage]);

  //   const fetchPeople = async (currentPage) => {
  //     const { data } = await axios.get(currentPage);
  //     setNextPage(data.next);
  //     setPreviousPage(data.previous);
  //     return data.results;
  //   };

  // useEffect(() => {
  //   fetchPeople(currentPage)
  //     .then((people) => Promise.all(people.map(fetchAuxilaryDataForPerson)))
  //     .then(setCharacters);
  // }, [currentPage]);

  return (
    <div className="h-screen text-white container flex flex-col items-center mx-auto  justify-center ">
      <ThemeBtn />
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-5 text-6xl font-bold text-starYellow lg:text-8xl">
          StarWars
        </h1>
        {/* <SearchBar /> */}
        <div>{/* <CharacterList characters={characters} /> */}</div>
        <div className="flex flex-col-reverse mt-5  md:flex-row md:space-x-10  ">
          <button
            className="bg-starYellow text-spaceBlack font-bold px-4 py-2 rounded-full baseline hover:bg-spaceBlack hover:text-starYellow"
            onClick={() => nextPage(previous)}
          >
            Previous Page
          </button>
          <button
            style={{
              color: "black",
              background: "yellow",
              borderRadius: "10px",
              padding: "10px",
            }}
            onClick={() => console.log(character)}
          >
            Test Button
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
  );
};

export default App;
