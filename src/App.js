import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import SearchBar from "./Components/SearchBar";
import loadingGif from "./Components/loading.gif";

const Default_Species = "Human";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://swapi.dev/api/people/?page=1"
  );
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchedCharacter, setSearchedCharacter] = useState("");

  const goToPreviousPage = () => {
    setCurrentPage(previousPage);
  };

  const goToNextPage = () => {
    setCurrentPage(nextPage);
  };

  const fetchPeople = async (currentPage) => {
    const { data } = await axios.get(currentPage);
    setNextPage(data.next);
    setPreviousPage(data.previous);
    return data.results;
  };

  const fetchAuxilaryDataForPerson = async (person) => {
    setIsLoading(true);
    const [homeWorldName, species] = await Promise.all([
      axios.get(person.homeworld).then(({ data }) => data.name),
      person.species.length
        ? axios.get(person.species[0]).then(({ data }) => data.name)
        : Promise.resolve(Default_Species),
    ]);
    setIsLoading(false);
    return {
      ...person,
      homeWorldName,
      species,
    };
  };

  useEffect(() => {
    fetchPeople(currentPage)
      .then((people) => Promise.all(people.map(fetchAuxilaryDataForPerson)))
      .then(setCharacters);
  }, [currentPage]);

  return (
    <div>
      <SearchBar />
      {isLoading ? (
        <img
          style={{ height: "150px", width: "150px" }}
          src={loadingGif}
          alt="loading..."
        />
      ) : (
        <CharacterList characters={characters} />
      )}
      <button onClick={goToPreviousPage}>Back Page</button>
      <button onClick={goToNextPage}>Next Page</button>
    </div>
  );
};

export default App;
