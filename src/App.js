import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import { fetchPeople } from "./services/fetchPeople";

const DEFAULT_SPECIES = 'Human';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const goBackOnePage = () => {
    setPage(Math.max(1, page - 1))
  }

  const goForwardOnePage = () => {
    setPage(page + 1)
  }

  const fetchAnxiliaryDataForPerson = async (person) => {
    const [homeWorldName, species] = await Promise.all([
      axios.get(person.homeworld).then(({ data }) => data.name),
      person.species.length ?
        axios.get(person.species[0]).then(({ data }) => data.name) :
        Promise.resolve(DEFAULT_SPECIES)
    ])
    return {
      ...person,
      homeWorldName,
      species,
    }
  }

  useEffect(() => {
    fetchPeople(page)
      .then(people =>
        Promise.all(people.map(fetchAnxiliaryDataForPerson))
      )
      .then(setCharacters)
  }, [page])

  return (
    <div>
      <CharacterList characters={characters} />
      <h4>Real Buttons Below</h4>
      <button onClick={goBackOnePage}>Back Page</button>
      <button onClick={goForwardOnePage}>Next Page</button>
    </div >
  );
}

export default App;
