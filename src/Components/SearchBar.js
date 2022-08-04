import axios from "axios";
import React, { useState } from "react";
import SearchedCharacter from "./SearchedCharacter";
// lift the state up of what i search here, insert the search link similar to how done on fetchPeople. Then use fetchauxilarydata for each search

const SearchBar = ({ findSearch }) => {
  const [personSearch, setPersonSearch] = useState("");
  const [foundPerson, setFoundperson] = useState([]);

  const Default_Species = "Human";

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

  const findCharacter = async () => {
    const data = await axios.get(
      `https://swapi.dev/api/people/?search=${personSearch}`
    );
    // setFoundperson(data.data.results[0]);
    return data.data.results[0];
  };

  // fetchPeople(currentPage)
  // .then((people) => Promise.all(people.map(fetchAuxilaryDataForPerson)))
  // .then(setCharacters);

  const submitSearch = (e) => {
    e.preventDefault();
    findCharacter(personSearch)
      .then(fetchAuxilaryDataForPerson)
      .then(setFoundperson);

    console.log(foundPerson);

    clearForm(e);
  };

  const clearForm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitSearch}>
      <h3>Search Your Favorite Star Wars Character</h3>
      <input
        type="text"
        value={personSearch}
        onChange={(e) => setPersonSearch(e.target.value)}
        placeholder="Try Searching Han Solo"
      />
      <button>Search</button>
      <SearchedCharacter foundPerson={foundPerson} />
    </form>
  );
};

export default SearchBar;
