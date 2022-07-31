import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import { fetchPeople } from "./Services/fetchPeople";
import SearchBar from "./Components/SearchBar";
import loadingGif from "./Components/loading.gif";

const Default_Species = "Human";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const goBackOnePage = () => {
    setPage(Math.max(1, page - 1));
  };

  const goForwardOnePage = () => {
    setPage(page + 1);
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
    fetchPeople(page)
      .then((people) => Promise.all(people.map(fetchAuxilaryDataForPerson)))
      .then(setCharacters);
  }, [page]);

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
      {/* <CharacterList characters={characters} /> */}
      <button onClick={goBackOnePage}>Back Page</button>
      <button onClick={goForwardOnePage}>Next Page</button>
    </div>
  );
};

export default App;
